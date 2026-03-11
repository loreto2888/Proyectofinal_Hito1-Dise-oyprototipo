import { Router } from 'express';

const router = Router();

// Maqueta en memoria
const FAVORITES = [];

router.get('/', (req, res) => {
  res.json(FAVORITES);
});

router.post('/', (req, res) => {
  const { postId } = req.body;
  const fav = { id: Date.now(), userId: 1, postId };
  FAVORITES.push(fav);
  res.status(201).json(fav);
});

router.delete('/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  const index = FAVORITES.findIndex((f) => f.postId === postId);
  if (index !== -1) FAVORITES.splice(index, 1);
  res.status(204).end();
});

export default router;
