import * as Yup from 'yup';

import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll({ order: [['name', 'DESC']] });

    const selectedCouriers = [];

    couriers.map(courier =>
      courier.name.toLowerCase().match(req.query.q.toLowerCase())
        ? selectedCouriers.push(courier)
        : null,
    );

    return res.json(selectedCouriers.length > 1 ? selectedCouriers : couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      res.status(400).json({ error: 'Courier already exists' });
    }
    const { id, name, email } = await Courier.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const courier = await Courier.findByPk(req.params.id);

    await courier.update(req.body);

    return res.json(courier);
  }

  async destroy(req, res) {
    const courier = await Courier.findByPk(req.params.id);

    await courier.destroy();

    return res.json(`Courier:${courier.name} deleted!`);
  }
}

export default new CourierController();
