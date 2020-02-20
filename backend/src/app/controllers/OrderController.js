/* eslint-disable camelcase */
import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isAfter, startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

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
      const courierOrders = await Order.findAll({
        where: {
          courier_id: req.params.id,
          end_date: null,
          canceled_at: null, // Encomendas que não foram Finalizadas ou Canceladas
        },
        order: [['id', 'ASC']],
      });

      return res.json(courierOrders);
    }

    // Todas Encomendas
    const orders = await Order.findAll({ order: [['id', 'ASC']] });

    return res.json(orders);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    // Encomenda a ser Cancelada
    if (req.params.cancel) {
      const canceled_at = new Date();

      await order.update({ canceled_at });

      return res.json(order);
    }

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
