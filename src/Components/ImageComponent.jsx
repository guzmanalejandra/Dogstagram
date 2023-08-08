import React from 'react';
import Zelda from '../images/Zelda.webp';


function ImageComponent({ imageName }) {
  let imageSrc;

  // Determinar qué imagen importar según el nombre proporcionado
  if (imageName.includes('Zelda')) {
    imageSrc = Zelda;
  }

  // Mostrar la imagen si se encontró una coincidencia
  if (imageSrc) {
    return <img src={imageSrc} alt="Imagen" />;
  }

  // Mostrar mensaje si no se encontró una coincidencia
  return <div>No se encontró la imagen</div>;
}

export default ImageComponent;
