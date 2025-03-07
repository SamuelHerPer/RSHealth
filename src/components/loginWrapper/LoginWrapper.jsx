import React from 'react'
import "./LoginWrapper.css";
import Carousel from '../inicio/Carousel/Carousel';

// Muestra el wrapper con las opiniones de los usuarios.
const LoginWrapper = () => {
  // Array de opiniones (en un futuro se sacarán de la base de datos).
  const opiniones = [
  "Gracias a RSH Health puedo tener acceso a la información de las farmacias cercanas en cualquier lugar, además, tengo toda mi información médica a mano. Es una herramienta imprescindible para cualquiera que quiera cuidar su salud de manera eficiente. ¡Altamente recomendada!",
  "RSH Health ha transformado la forma en que gestiono mi salud. La aplicación es fácil de usar y navegar. Puedo acceder rápidamente a mi historial médico, programar citas y tener un contacto directo con mi clínica. "
  ];
  return (
    <div id='LoginWrapper'>
      <div id='Valoraciones'>
        <div id='InformacionValoraciones'>
          <h4>+<span>5k</span> de clientes satisfechos</h4>
          <Carousel children={opiniones} />
        </div>
      </div>
    </div>
  )
}

export default LoginWrapper