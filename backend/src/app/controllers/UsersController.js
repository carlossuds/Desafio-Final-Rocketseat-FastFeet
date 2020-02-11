import * as Yup from 'yup';

import Users from '../models/Users';

class UsersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const userExists = await Users.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await Users.create(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {
    const users = await Users.findAll();

    return res.json(users);
  }
}

export default new UsersController();
