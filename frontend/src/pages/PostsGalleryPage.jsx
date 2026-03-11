import { Link } from 'react-router-dom';

const MOCK_POSTS = [
  { id: 1, title: 'Bicicleta usada', price: 80000, location: 'Santiago' },
  { id: 2, title: 'Notebook gamer', price: 650000, location: 'Valparaíso' },
];

function PostsGalleryPage() {
  return (
    <div className="page">
      <h2>Publicaciones</h2>
      <div className="filters card">
        <p>Filtros de ejemplo (categoría, precio, ubicación).</p>
      </div>
      <div className="grid">
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className="card post-card">
            <div className="post-image-placeholder" />
            <h3>{post.title}</h3>
            <p className="price">${post.price}</p>
            <p className="location">{post.location}</p>
            <Link to={`/posts/${post.id}`} className="btn-secondary">
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default PostsGalleryPage;
