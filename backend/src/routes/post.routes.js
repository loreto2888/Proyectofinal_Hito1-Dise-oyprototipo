import { Router } from 'express';

const router = Router();

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Bicicleta usada',
    description: 'Bicicleta en buen estado, poco uso.',
    price: 80000,
    status: 'usado',
    category: 'Deportes',
    location: 'Santiago',
    mainImage: null,
  },
];

router.get('/', (req, res) => {
  const summary = MOCK_POSTS.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    mainImage: p.mainImage,
    location: p.location,
    category: p.category,
  }));
  res.json(summary);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = MOCK_POSTS.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

  res.json({
    ...post,
    images: [{ id: 1, url: 'https://via.placeholder.com/600x400' }],
    user: { id: 1, name: 'Usuario Demo', avatarUrl: null },
    isFavorite: false,
  });
});

router.post('/', (req, res) => {
  const { title, description, price, status, category, location, images } = req.body;
  const newPost = {
    id: Date.now(),
    title,
    description,
    price,
    status,
    category,
    location,
    mainImage: images?.[0] ?? null,
  };
  MOCK_POSTS.push(newPost);
  res.status(201).json(newPost);
});

export default router;
