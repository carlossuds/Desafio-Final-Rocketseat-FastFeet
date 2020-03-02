import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
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

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name, street: req.body.street },
    });

    if (recipientExists) {
      res.status(400).json({ error: 'Recipient already exists' });
    }
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    const recipients = await Recipient.findAll();

    const selectedRecipients = [];

    recipients.map(recipient =>
      recipient.name.toLowerCase().match(req.query.q.toLowerCase())
        ? selectedRecipients.push(recipient)
        : null,
    );

    return res.json(
      selectedRecipients.length > 1 ? selectedRecipients : recipients,
    );
  }
}

export default new RecipientController();
