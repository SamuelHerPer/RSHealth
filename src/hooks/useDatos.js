import { useContext } from "react";
import { ContextoDatos } from "../contexts/ProveedorDatos";

// Hook para comunicarse con el contexto de ProveedorDatos.
const useDatos = () => {
  const contexto = useContext(ContextoDatos);
  return contexto;
};

export default useDatos;