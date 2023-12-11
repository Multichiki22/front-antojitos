import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import api from "../../axiosConfig/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import navItemsByRole from "./ItemsByRole";
import svgLogo from "../../Assets/Svg/LogoCirculo.svg"

function NavBarAdmin() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const navigate = useNavigate();
  const logOut = () => {
    api
      .post("/auth/logout")
      .then((response) => {})
      .catch((error) => {
        setTituloError("Error con el servidor");
        setCuerpoError(
          `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
        );
        setModal(true);
      })
      .finally(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      });
  };
  const navItems = navItemsByRole[localStorage.getItem("role")] || [];
 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <ErrorModal
          show={modal}
          handleClose={handleClose}
          title={tituloError}
          body={cuerpoError}
        ></ErrorModal>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={svgLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Antojitos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inventario">Inventario</Nav.Link>

            {navItems}
          </Nav>
          <Navbar.Text>
            <NavDropdown
              title={localStorage.getItem("user") || "usuario"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarAdmin;
