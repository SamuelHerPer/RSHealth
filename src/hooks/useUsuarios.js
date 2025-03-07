import { useContext } from "react";
import { ContextoUsuarios } from "../contexts/ProveedorUsuarios.jsx";

// Hook para comunicarse con el contexto de ProveedorUsuarios.
const useUsuarios = () => {
  const contexto = useContext(ContextoUsuarios);
  return contexto;
};

export default useUsuarios;