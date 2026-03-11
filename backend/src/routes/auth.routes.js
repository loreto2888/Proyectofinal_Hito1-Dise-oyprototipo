import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// Para Hito 1 se usan datos en memoria como maqueta
const DEMO_USER = {
  id: 1,
  name: 'Usuario Demo',
  email: 'demo@demo.com',
  avatarUrl: null,
};

router.post('/login', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ id: DEMO_USER.id }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '1h',
  });
  res.json({ token, user: { ...DEMO_USER, email } });
});

router.get('/me', (req, res) => {
  // Sólo ejemplo: en próximos hitos se validará token
  res.json({ user: DEMO_USER });
});

export default router;
