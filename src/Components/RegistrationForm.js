import React, { useState } from 'react';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [likes, setLikes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `CREATE (n:Persona {Contraseña: '${password}', FechaNacimiento: '${dateOfBirth}', GenerosGusta: '${likes}', Genero: '${gender}', nombre: '${name}'})`;
    console.log(query);

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, dateOfBirth, likes, gender, name }),
      });

      if (response.ok) {
        alert('Registro exitoso');
        // Optionally, you can redirect to a success page or perform any other desired action
      } else {
        throw new Error('Registro fallido');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error durante el registro');
    }
  };

  return (
    <div className="container">
      <div className="registration-form">
        <h1>Formulario de Registro</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="dateOfBirth">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <br /><br />
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Seleccionar Género</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Other">Otro</option>
          </select>
          <br /><br />
          <label htmlFor="likes">Gustos:</label>
          <select
            id="likes"
            name="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            required
          >
            <option value="">Seleccionar Gusto</option>
            <option value="Acción-Aventuras">Acción-Aventuras</option>
            <option value="Plataformas">Plataformas</option>
            <option value="Acción-RPG">Acción-RPG</option>
            <option value="Deportes">Deportes</option>
            <option value="Rol(RPG)">Rol (RPG)</option>
            <option value="Puzzles">Puzzles</option>
          </select>
          <br /><br />
          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
