import React, { useState, useEffect } from 'react';
import './Carousel.css';

// Componente que muestra un carousel.
const Carousel = ({ children }) => {
  // Se declaran los estados necesario en ámbito local.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir a la diapositiva anterior.
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? children.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Función para ir a la diapositiva siguiente.
  const goToNext = () => {
    const isLastSlide = currentIndex === children.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Cambia a la siguiente diapositiva cada 5 segundos.
  useEffect(() => {
    const interval = setInterval(() => {
      goToPrevious();
    }, 5000); // Cambiar cada 5000ms (5 segundos)

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [currentIndex]); // Reiniciar el intervalo cuando cambia el indice.

  // Pinta el contenido del carousel.
  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => (
          <p className="carousel-item" key={index}>
            "{child}"
            <br/><br/>
            - Usuario de RSH Health
          </p>
        ))}
      </div>
      <button className="carousel-button prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;