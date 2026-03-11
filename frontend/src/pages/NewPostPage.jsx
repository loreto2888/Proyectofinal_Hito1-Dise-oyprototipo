import { useState } from 'react';

function NewPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('nuevo');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se conectará con POST /api/posts
    console.log({ title, description, price, category, status, location, images });
  };

  return (
    <div className="page">
      <h2>Crear publicación</h2>
      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Descripción
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Categoría
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Estado
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </label>
        <label>
          Ubicación
          <input value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Imágenes (URLs separadas por coma)
          <input value={images} onChange={(e) => setImages(e.target.value)} />
        </label>
        <button type="submit" className="btn-primary">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;
