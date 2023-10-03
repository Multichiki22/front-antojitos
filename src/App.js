import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Inventario from "./Components/Inventario/Inventario";
import MisSalidas from "./Components/MisSalidas/MisSalidas";
import Resumen from "./Components/Resumen/Resumen";
import NuevaSalida from "./Components/NuevaSalida/NuevaSalida";
import NavBarAdmin from "./Components/NavBarAdmin/NavBarAdmin";
import Login from "./Components/Login/Login";
import { useEffect } from "react";
import Salidas from "./Components/Salidas/Salidas";
import NuevaEntrada from "./Components/NuevaEntrada/NuevaEntrada";
import NuevoProducto from "./Components/NuevoProducto/NuevoProducto";
import Usuarios from "./Components/Usuarios/Usuarios";
import NuevoUsuario from "./Components/NuevoUsuario/NuevoUsuario";
import ResumenHoy from "./Components/ResumenHoy/ResumenHoy";
import Categorias from "./Components/Categorias/Categorias";
import NuevaCategoria from "./Components/NuevaCategoria/NuevaCategora";

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  
  let isAuthenticated = false; // Ajusta tu lógica de autenticación
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
        <Route exact path="/usuarios" element={<Usuarios />} />
        <Route exact path="/nuevoUsuario" element={<NuevoUsuario />} />
        <Route exact path="/nuevaEntrada" element={<NuevaEntrada />} />
        <Route exact path="/nuevoProducto" element={<NuevoProducto />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/misSalidas" element={<MisSalidas />} />
        <Route exact path="/salidas" element={<Salidas />} />
        <Route exact path="/resumen" element={<Resumen />} />
        <Route exact path="/miResumen" element={<ResumenHoy />} />
        <Route exact path="/inventario" element={<Inventario />} />
        <Route exact path="/categorias" element={<Categorias />} />
        <Route exact path="/nuevaCategoria" element={<NuevaCategoria />} />
        <Route path="/vender" element={<NuevaSalida />} />
      </Routes>
    </div>
  );
}

export default App;
