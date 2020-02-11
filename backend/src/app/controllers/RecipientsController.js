import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const recipientExists = await Recipients.findOne({
      where: { name: req.body.name, street: req.body.street },
    });

    if (recipientExists) {
      res.status(400).json({ error: 'Recipient already exists' });
    }
    const recipient = await Recipients.create(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    const recipients = await Recipients.findAll();

    return res.json(recipients);
  }
}

export default new RecipientsController();
