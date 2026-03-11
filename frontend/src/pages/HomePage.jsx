import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Encuentra lo que buscas</h1>
          <p>Un marketplace simple para publicar y descubrir productos.</p>
          <Link to="/posts" className="btn-primary">
            Ver publicaciones
          </Link>
        </div>
        <div className="hero-placeholder">Hero Section</div>
      </section>
    </div>
  );
}

export default HomePage;
