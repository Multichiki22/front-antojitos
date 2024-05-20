import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MisSalidas from "./Components/MisSalidas/MisSalidas";
import Resumen from "./Components/Resumen/Resumen";
import NavBarAdmin from "./Components/NavBarAdmin/NavBarAdmin";
import Login from "./Components/Login/Login";
import Salidas from "./Components/Salidas/Salidas";
import NuevaEntrada from "./Components/NuevaEntrada/NuevaEntrada";
import NuevoProducto from "./Components/NuevoProducto/NuevoProducto";
import Usuarios from "./Components/Usuarios/Usuarios";
import NuevoUsuario from "./Components/NuevoUsuario/NuevoUsuario";
import ResumenHoy from "./Components/ResumenHoy/ResumenHoy";
import Categorias from "./Components/Categorias/Categorias";
import NuevaCategoria from "./Components/NuevaCategoria/NuevaCategora";
import Welcome from "./Components/Welcome/Welcome";
import Historico from "./views/Historico/Historico.jsx";
import EditarProducto from "./views/EditarProducto/EditarProducto";
import EntradasFechaView from "./views/HistoricoEntradasFecha/EntradasFechaView.tsx";
import EntradasProductoView from "./views/HistoricoEntradasProducto/EntradasFechaProducto.tsx";
import InventarioView from "./views/InventarioView/InventarioView.tsx";
import NuevaSalidaV2 from "./Components/NuevaSalida/NuevaSalidaV2.tsx";


function App() {
  const navigate = useNavigate();
  const location = useLocation()

  
  let isAuthenticated = false; 
  if (
    !!localStorage &&
    !!localStorage.accessToken &&
    !!localStorage.role &&
    !!localStorage.user
  ) {
    isAuthenticated = true;
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      {location.pathname !== "/login" && <NavBarAdmin/>}
      <Routes>
        <Route />
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/usuarios" element={<Usuarios />} />
        <Route exact path="/nuevoUsuario" element={<NuevoUsuario />} />
        <Route exact path="/nuevaEntrada" element={<NuevaEntrada />} />
        <Route exact path="/nuevoProducto" element={<NuevoProducto />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/misSalidas" element={<MisSalidas />} />
        <Route exact path="/salidas" element={<Salidas />} />
        <Route exact path="/resumen" element={<Resumen />} />
        <Route exact path="/miResumen" element={<ResumenHoy />} />
        <Route exact path="/inventario" element={<InventarioView />} />
        <Route exact path="/categorias" element={<Categorias />} />
        <Route exact path="/nuevaCategoria" element={<NuevaCategoria />} />
        <Route exact path="/producto/editar/:id" element={<EditarProducto />} />
        <Route exact path="/historico" element={<Historico />} />
        <Route exact path="/entradasFecha/:fecha?" element={<EntradasFechaView />} />
        <Route exact path="/entradasProducto/:id" element={<EntradasProductoView />} />
        <Route exact path="/vender/:id" element={<NuevaSalidaV2 />} />
        <Route exact path="/vender" element={<NuevaSalidaV2 />} />
      </Routes>
    </div>
  );
}

export default App;
