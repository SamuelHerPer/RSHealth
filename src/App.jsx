import "./assets/styles/App.css";
import Menu from "./components/essentials/Menu/Menu";
import Header from "./components/essentials/Header/Header";
import Contenido from "./components/essentials/Contenido/Contenido";
import { BrowserRouter } from "react-router-dom";
import ProveedorUsuarios from "./contexts/ProveedorUsuarios";
import ProveedorDatos from "./contexts/ProveedorDatos";
import LoadScriptWrapper from "./components/farmaciasPaciente/LoadScriptWrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <ProveedorUsuarios>
          <Menu />
          <Header />
          <ProveedorDatos>
            <LoadScriptWrapper>
            <Contenido />
            </LoadScriptWrapper>
          </ProveedorDatos>
        </ProveedorUsuarios>
      </BrowserRouter>
    </>
  );
}

export default App;
