import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
      await prisma.newsletterSubscriber.create({
        data: {
          email: email,
        },
      });
      return res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'This email is already subscribed.' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}