import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axiosConfig/axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import formatNumbers from "../../utilities/formatNumbers";
import extractNumberFromFormat from "../../utilities/extractNumbreFromFormat";
import Button from "react-bootstrap/esm/Button";
import Cargando from "../../Components/Cargando/Cargando";
import ToastSuccuess from "../../Components/Toast/Toast";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";

function EditarProducto() {
  /* <--------------- Modal Error -------------------> */
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);

  /* <--------------- Toast of succes -------------------> */
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  /* <--------------- Loading -------------------> */
  const [loading, setLoading] = useState(false);

  /* <--------------- Logica negocio -------------------> */
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [productoInfo, setProductoInfo] = useState({
    id: 0,
    nombre: "",
    categoria: "",
    precioDeVenta: 0,
  });

  useEffect(() => {
    api
    .get("categorias")
    .then((response) => {
      setCategorias(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
    api
      .get(`/productos/${id}`)
      .then((response) => {
        const respuesta = response.data;
        setProductoInfo({
          ...respuesta,
          categoria: respuesta.categoria.nombre,
        });
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
            setTituloError("Producto o categoria no encontrada");
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
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fixedInfo = {
      ...productoInfo,
      precioDeVenta: extractNumberFromFormat(productoInfo.precioDeVenta),
    };
    setLoading(true);
    api
      .put(`/productos/editar`, fixedInfo)
      .then(() => {
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
          } else if (error.response.status === 404) {
            setTituloError("Producto o categoria no encontrada");
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
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setProductoInfo({ ...productoInfo, [key]: value });
  };

  const handleNumericChange = (event) => {
    setProductoInfo({
      ...productoInfo,
      precioDeVenta: extractNumberFromFormat(event.target.value),
    });
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
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Producto:</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                name="nombre"
                placeholder="Nombre del Producto"
                onChange={handleChange}
                value={productoInfo.nombre}
                required
              />
            </Col>
            <Col>
            <Form.Label>Categoria:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={productoInfo.categoria}
                  name="categoria"
                  onChange={handleChange}
                >
                  <option value={""} disabled>Seleccione una categoria</option>
                  {categorias.map((categoria) => {
                    return (
                      <option value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Precio de venta</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                name="Precio de venta"
                placeholder="Precio de venta"
                onChange={handleNumericChange}
                value={formatNumbers(productoInfo.precioDeVenta)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Button style={{ backgroundColor: "#00325b" }} type="submit">
          {loading ? <Cargando></Cargando> : "Actualizar"}
        </Button>
      </Form>
      <ToastSuccuess showToast={showToast} toggleShowToast={toggleShowToast} />
    </Container>
  );
}

export default EditarProducto;
