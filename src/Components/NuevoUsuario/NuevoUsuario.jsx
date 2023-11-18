import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Toast from "react-bootstrap/esm/Toast";

import ErrorModal from "../ErrorModal/ErrorModal";
import api from "../../axiosConfig/axios";
import Cargando from "../Cargando/Cargando";
import { useState } from "react";

function NuevoUsuario(props) {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    user: "",
    password: "",
    role: "Vendedor",
  });

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setNuevoUsuario({ ...nuevoUsuario, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("users", nuevoUsuario)
      .then((response) => {
        setNuevoUsuario({
          user: "",
          password: "",
          role: "Vendedor",
        });
        setShowA(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setTituloError("Error con los datos");
            setCuerpoError(
              error.response.data.message.toString().replace(",", ".\n")
            );
            setModal(true);
          } else if (error.response.status === 404) {
            setTituloError("Producto no encontrado");
            setCuerpoError("Asegurese de escribir bien el nombre del producto");
            setModal(true);
          }
        } else {
          setTituloError("Error con el servidor");
          setCuerpoError(
            `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
          );
          setModal(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);
  };

  return (
    <Container>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      ></ErrorModal>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="user">
              <Form.Label>Nombre del usuario:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del nuevo usuario"
                onChange={handleChange}
                value={nuevoUsuario.user}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña del nuevo usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contraseña del nuevo usuario"
                onChange={handleChange}
                value={nuevoUsuario.password}
              />
            </Form.Group>
          </Col>
        </Row>

        <Col>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol del usuario:</Form.Label>
            <Form.Select
              aria-label="Default select example"
              defaultValue={"Vendedor"}
              onChange={handleChange}
              value={nuevoUsuario.role}
            >
              <option disabled>Open this select menu</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Button  style={{backgroundColor: "#00325b"}} type="submit">
        {loading ? <Cargando></Cargando> : "Crear Usuario"}
        </Button>
      </Form>
      <Toast
        bg="success"
        style={{ position: "absolute", bottom: "10px", left: "20px" }}
        show={showA}
        onClose={toggleShowA}
        delay={3000} autohide
      >
        <Toast.Header>
          <strong className="me-auto">Enviado</strong>
        </Toast.Header>
        <Toast.Body>
          <b>La informacion fue enviada de manera exitosa</b>
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default NuevoUsuario;
