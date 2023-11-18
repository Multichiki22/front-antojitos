
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ToastSuccuess from "../Toast/Toast";

import ErrorModal from "../ErrorModal/ErrorModal";
import api from "../../axiosConfig/axios";
import Cargando from "../Cargando/Cargando";
import { useEffect, useState } from "react";

function NuevoProducto() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const [valid, setValid] = useState(true);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [entradaInfo, setEntradaInfo] = useState({
    nombre: "",
    cantidadPorPaquete: "",
    costoPorPaquete: "",
    cantidadDePaquetes: "",
    precioDeVenta: "",
    categoria: "",
  });

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    if (key === "nombre") {
      const found = productos.find(
        (prodcuto) => prodcuto.nombre.toLowerCase() === value.toLowerCase()
      );
      if (found) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
    setEntradaInfo({ ...entradaInfo, [key]: value });
  };

  const intitlaRequests = () => {
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
      .get("productos/vigentes")
      .then((response) => {
        console.log("productos:", productos);
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    intitlaRequests();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(productos);
    const found = productos.find(
      (prodcuto) =>
        prodcuto.nombre.toLowerCase() === entradaInfo.nombre.toLowerCase()
    );
    if (found) {
      setTituloError("Producto repertido");
      setCuerpoError("Asegurese de usar un nombre descriptivo del producto");
      setModal(true);
    } else if (entradaInfo.categoria === "") {
      setTituloError("Categoria invalida");
      setCuerpoError("Debe asignar una categoria");
      setModal(true);
    } else {
      api
        .post("productos", entradaInfo)
        .then((response) => {
          setEntradaInfo({
            nombre: "",
            cantidadPorPaquete: "",
            costoPorPaquete: "",
            cantidadDePaquetes: "",
            precioDeVenta: "",
            categoria: "",
          });
          setShowToast(true);
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response) {
            if (error.response.status === 400) {
              setTituloError("Error con los datos");
              setCuerpoError(
                error.response.data.message.toString().replace(",", ".\n")
              );
              setModal(true);
            } else if (error.response.status === 404) {
              setTituloError("Producto no encontrado");
              setCuerpoError(
                "Asegurese de escribir bien el nombre del producto"
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
    }
  };

  const costoUnidad =
    entradaInfo.costoPorPaquete / entradaInfo.cantidadPorPaquete;
  const valorEntrada =
    entradaInfo.costoPorPaquete * entradaInfo.cantidadDePaquetes;
  const cantidadTotalAEntrar =
    entradaInfo.cantidadDePaquetes * entradaInfo.cantidadPorPaquete;
  const ganaciaUnidad = entradaInfo.precioDeVenta - costoUnidad;
  const porcentajeGanancia = Math.round(
    ((entradaInfo.precioDeVenta - costoUnidad) / entradaInfo.precioDeVenta) *
      100
  );

  return (
    <Container>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      ></ErrorModal>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre del producto a crear:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del Producto a crear"
            onChange={handleChange}
            value={entradaInfo.nombre}
          />
          {valid ? null : (
            <Form.Text style={{ color: "red" }}>Prodcuto aun vigente</Form.Text>
          )}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="cantidadPorPaquete">
              <Form.Label>Unidades por paquete:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unidades por paquete"
                onChange={handleChange}
                value={entradaInfo.cantidadPorPaquete}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="cantidadDePaquetes">
              <Form.Label>Cantidad de paquetes:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad de paquetes comprados:"
                onChange={handleChange}
                value={entradaInfo.cantidadDePaquetes}
              />
            </Form.Group>
          </Col>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="costoPorPaquete">
                <Form.Label>Costo por paquete:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Costo por paquete"
                  onChange={handleChange}
                  value={entradaInfo.costoPorPaquete}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="precioDeVenta">
                <Form.Label>Precio de venta del producto:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio de venta del producto"
                  onChange={handleChange}
                  value={entradaInfo.precioDeVenta}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="categoria">
                <Form.Label>Categoria:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={entradaInfo.categoria}
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
              </Form.Group>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad total de productos a entrar: </Form.Label>
              <Form.FloatingLabel>{`${cantidadTotalAEntrar}`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Costo total de la entrada: </Form.Label>
              <Form.FloatingLabel>{`${valorEntrada} $`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Costo de cada unidad: </Form.Label>
              <Form.FloatingLabel>{`${costoUnidad} $`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Ganancia de cada unidad: </Form.Label>
              <Form.FloatingLabel>{`${ganaciaUnidad} $`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Porcentaje de Ganancia: </Form.Label>
              <Form.FloatingLabel>{`${porcentajeGanancia}%`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Button style={{backgroundColor: "#00325b"}} type="submit">
          {loading ? <Cargando></Cargando> : "Generar entrada"}
        </Button>
      </Form>
  <ToastSuccuess showToast={showToast} toggleShowToast={toggleShowToast} />
    </Container>
  );
}

export default NuevoProducto;
