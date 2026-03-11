import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, avatarUrl } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    email,
    avatarUrl: avatarUrl ?? null,
  };
  res.status(201).json(newUser);
});

export default router;
