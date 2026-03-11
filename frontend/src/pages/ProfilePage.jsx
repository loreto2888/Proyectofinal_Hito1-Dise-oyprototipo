import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page profile-page">
      <section className="card profile-card">
        <h2>Mi perfil</h2>
        <p><strong>Nombre:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </section>
      <section className="card profile-section">
        <h3>Mis publicaciones</h3>
        <p>Listado de publicaciones del usuario (maqueta).</p>
        <Link to="/profile/posts/new" className="btn-primary">
          Crear nueva publicación
        </Link>
      </section>
      <section className="card profile-section">
        <h3>Mis favoritos</h3>
        <p>Listado de publicaciones favoritas (maqueta).</p>
      </section>
    </div>
  );
}

export default ProfilePage;
