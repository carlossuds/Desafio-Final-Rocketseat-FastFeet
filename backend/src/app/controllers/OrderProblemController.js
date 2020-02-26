import * as Yup from 'yup';
import OrderProblem from '../models/OrderProblem';
import Order from '../models/Order';
import Courier from '../models/Courier';
import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const problemExists = await OrderProblem.findOne({
      where: { order_id: req.params.id, description: req.body.description },
    });

    if (problemExists) {
      return res.status(400).json({ error: 'Problem already exists' });
    }

    const problem = await OrderProblem.create({
      order_id: req.params.id,
      description: req.body.description,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const problems = await OrderProblem.findAll({
      where: { order_id: req.params.id },
    });

    return res.json(problems);
  }

  async update(req, res) {
    const problem = await OrderProblem.findByPk(req.params.id);

    const orderToCancel = await Order.findByPk(problem.order_id);

    await orderToCancel.update({ canceled_at: new Date() });

    const courier = await Courier.findByPk(orderToCancel.courier_id);

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Encomenda Cancelada!',
      text: `${courier.name}, a Encomenda: ${orderToCancel.id} foi Cancelada! \n\n
        Atenciosamente, Admin FastFeet`,
    });

    return res.json(orderToCancel);
  }
}

export default new OrderController();
