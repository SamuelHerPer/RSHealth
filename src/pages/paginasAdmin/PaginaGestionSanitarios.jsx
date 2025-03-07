import React from "react";
import FormularioSanitario from "../../components/gestionAdministrador/formularioSanitario/FormularioSanitario";
import "./PaginaGestionSanitarios.css";

// Página para crear un nuevo usuario Sanitario.
const PaginaGestionSanitarios = () => {
  return (
    <div id="PaginaGestionSanitarios">
      <h1>Nuevo Sanitario</h1>
      <FormularioSanitario />
    </div>
  );
};

export default PaginaGestionSanitarios;
