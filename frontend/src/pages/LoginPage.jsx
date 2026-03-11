import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llamado a API real se implementará en hitos posteriores
    const fakeResponse = {
      token: 'fake-jwt-token',
      user: { id: 1, name: 'Usuario Demo', email },
    };
    login(fakeResponse);
    navigate('/profile');
  };

  return (
    <div className="page auth-page">
      <h2>Iniciar sesión</h2>
      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary">
          Entrar
        </button>
        <p className="form-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
