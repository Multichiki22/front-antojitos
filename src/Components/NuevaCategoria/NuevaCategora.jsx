import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ToastSuccuess from "../Toast/Toast";

import ErrorModal from "../ErrorModal/ErrorModal";
import api from "../../axiosConfig/axios";
import Cargando from "../Cargando/Cargando";
import { useState } from "react";

function NuevaCategoria(props) {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const [categoria, setCategoria] = useState({
    nombre: ""
  });

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setCategoria({ ...categoria, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post("categorias", categoria)
      .then((response) => {
        setCategoria({
            nombre: ""
        });
        setShowToast(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setTituloError("Error con los datos");
            setCuerpoError(
              error.response.data.message.toString().replace(",", ".\n")
            );
            setModal(true);
          }
          if (error.response.status === 500) {
            setTituloError("Error con el servidor");
            setCuerpoError(
              `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
            );
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
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre de la nueva categoria:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la categoria"
                onChange={handleChange}
                value={categoria.nombre}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button  style={{backgroundColor: "#00325b"}} type="submit">
        {loading ? <Cargando></Cargando> : "Crear Categoria"}
        </Button>
      </Form>
     <ToastSuccuess showToast={showToast} toggleShowToast={toggleShowToast} />
    </Container>
  );
}

export default NuevaCategoria;
