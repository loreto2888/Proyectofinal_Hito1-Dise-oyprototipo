import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Layout({ children }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            Marketplace
          </Link>
        </div>
        <nav className="header-center">
          <Link to="/posts">Tienda</Link>
        </nav>
        <div className="header-right">
          {isAuthenticated ? (
            <>
              <span className="user-name">Hola, {user?.name}</span>
              <Link to="/profile">Mi perfil</Link>
              <button className="btn-secondary" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register" className="btn-primary">
                Regístrate
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">© {new Date().getFullYear()} Marketplace</footer>
    </div>
  );
}

export default Layout;
