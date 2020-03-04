/* eslint-disable camelcase */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isAfter, startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      courier_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const { recipient_id, courier_id, product } = req.body;

    const orderExists = await Order.findOne({
      where: { recipient_id, courier_id, product },
    });

    if (orderExists) {
      return res.status(400).json({ error: 'Order already exists' });
    }

    const order = await Order.create(req.body);

    const courier = await Courier.findOne({ where: { id: order.courier_id } });

    const recipient = await Recipient.findOne({
      where: { id: order.recipient_id },
    });

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova Encomenda!',
      text: `${courier.name}, você foi designado para uma nova encomenda! \n\n
        Destinatário:${recipient.name}\n
        Cidade: ${recipient.city} - ${recipient.state} \n
        Endereço: ${recipient.street}, ${recipient.number} - ${recipient.complement} \n\n
        Atenciosamente, Admin FastFeet`,
    });

    return res.json(order);
  }

  async index(req, res) {
    if (req.params.id) {
      if (req.params.ended) {
        const endedCourierOrders = await Order.findAll({
          where: {
            courier_id: req.params.id,
            end_date: {
              [Op.between]: [new Date(0), new Date()],
            }, // Encomendas que foram Entregues
          },
          order: [['id', 'ASC']],
        });
        return res.json(endedCourierOrders);
      }

      const openCourierOrders = await Order.findAll({
        where: {
          courier_id: req.params.id,
          end_date: null,
          canceled_at: null, // Encomendas que não foram Finalizadas ou Canceladas
        },
        order: [['id', 'ASC']],
      });

      return res.json(openCourierOrders);
    }

    // Todas Encomendas de todos Entregadores
    const orders = await Order.findAll({ order: [['id', 'ASC']] });

    const ordersWithData = [];

    await Promise.all(
      orders.map(async order => {
        const recipient = await Recipient.findByPk(order.recipient_id);
        const courier = await Courier.findByPk(order.courier_id);
        const file = await File.findByPk(courier.avatar_id);

        ordersWithData.push({ order, recipient, courier, file });
      }),
    );

    const selectedOrdersWithData = [];

    ordersWithData.map(order =>
      order.order.product
        .toLowerCase()
        .match(req.query.q ? req.query.q.toLowerCase() : null)
        ? selectedOrdersWithData.push(order)
        : null,
    );

    return res.json(
      selectedOrdersWithData.length >= 1
        ? selectedOrdersWithData
        : ordersWithData,
    );
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    // Encomenda a ser Iniciada
    if (!order.start_date) {
      const courierOrders = await Order.findAll({
        where: {
          courier_id: order.courier_id,
          start_date: {
            [Op.between]: [startOfDay(new Date()), endOfDay(new Date())], // Encomendas do Dia
          },
        },
      });

      // Se ultrapassar o Limite Diário, retorna erro.
      if (courierOrders.length >= 5) {
        return res
          .status(401)
          .json({ error: 'Maximum of 5 daily orders allowed' });
      }
      const start_date = new Date();

      await order.update({ start_date });

      return res.json(order);
    }
    // Encomenda a ser Finalizada
    if (isAfter(order.updatedAt, order.createdAt)) {
      const end_date = new Date();
      if (end_date && !isAfter(end_date, order.start_date)) {
        return res.status(401).json('Invalid End Date!');
      }

      await order.update({ end_date });

      return res.json(order);
    }

    // Se nada acontecer, algo está errado
    return res.json({ message: 'Something went wrong' });
  }
}

export default new OrderController();
