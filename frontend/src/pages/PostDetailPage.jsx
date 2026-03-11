import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();

  // En el futuro se obtendrán datos reales desde GET /api/posts/:id
  const mockPost = {
    id,
    title: 'Bicicleta usada',
    description: 'Bicicleta en buen estado, poco uso.',
    price: 80000,
    location: 'Santiago',
  };

  return (
    <div className="page detail-page">
      <div className="detail-layout">
        <div className="detail-images card">
          <div className="image-main-placeholder">Imágenes de la publicación</div>
        </div>
        <div className="detail-info card">
          <h2>{mockPost.title}</h2>
          <p className="price">${mockPost.price}</p>
          <p>{mockPost.description}</p>
          <p className="location">Ubicación: {mockPost.location}</p>
          <button className="btn-primary">Contactar vendedor</button>
          <button className="btn-secondary">Agregar a favoritos</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
