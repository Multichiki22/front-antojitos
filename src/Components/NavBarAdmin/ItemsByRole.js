import NavDropdown from "react-bootstrap/NavDropdown";

const navItemsByRole = {
  Admin: [
    <>
      <NavDropdown title="Entradas" id="basic-nav-dropdown">
        <NavDropdown.Item href="/nuevaEntrada">Nueva entrada</NavDropdown.Item>
        <NavDropdown.Item href="/nuevoProducto">
          Nuevo Producto
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Categorias" id="basic-nav-dropdown">
        <NavDropdown.Item href="/nuevaCategoria">Nueva categoria</NavDropdown.Item>
        <NavDropdown.Item href="/categorias">
          Categorias
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Salidas" id="basic-nav-dropdown">
        <NavDropdown.Item href="/vender">Nueva Salida</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/misSalidas">
          Todas mis salidas
        </NavDropdown.Item>
        <NavDropdown.Item href="/salidas">Todas salidas hoy</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/miResumen">Mi resumen Hoy</NavDropdown.Item>
        <NavDropdown.Item href="/resumen">Resumen Hoy</NavDropdown.Item>
      </NavDropdown>
    </>,
  ],
  Vendedor: [
    <NavDropdown title="Salidas" id="basic-nav-dropdown">
      <NavDropdown.Item href="/vender">Nueva Salida</NavDropdown.Item>
      <NavDropdown.Item href="/misSalidas">Todas mis salidas</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/miResumen">Mi resumen Hoy</NavDropdown.Item>
    </NavDropdown>,
  ],
  SuperAdmin: [
    <>
      <NavDropdown title="Entradas" id="basic-nav-dropdown">
        <NavDropdown.Item href="/nuevaEntrada">Nueva entrada</NavDropdown.Item>
        <NavDropdown.Item href="/nuevoProducto">
          Nuevo Producto
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Categorias" id="basic-nav-dropdown">
        <NavDropdown.Item href="/nuevaCategoria">Nueva categoria</NavDropdown.Item>
        <NavDropdown.Item href="/categorias">
          Categorias
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Salidas" id="basic-nav-dropdown">
        <NavDropdown.Item href="/vender">Nueva Salida</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/misSalidas">
          Todas mis salidas
        </NavDropdown.Item>
        <NavDropdown.Item href="/salidas">Todas salidas hoy</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/miResumen">Mi resumen Hoy</NavDropdown.Item>
        <NavDropdown.Item href="/resumen">Resumen Hoy</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Usuarios" id="basic-nav-dropdown">
        <NavDropdown.Item href="/usuarios">Usuarios</NavDropdown.Item>
        <NavDropdown.Item href="/nuevoUsuario">Nuevo Usuarios</NavDropdown.Item>
      </NavDropdown>
    </>,
  ],
};

export default navItemsByRole;
