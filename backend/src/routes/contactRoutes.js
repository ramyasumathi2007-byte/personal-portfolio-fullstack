import { Router } from 'express';
import Contact from '../models/Contact.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject = '', message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Your message has been saved. Thank you!', data: { id: contact._id } });
  } catch (error) { next(error); }
});

export default router;
