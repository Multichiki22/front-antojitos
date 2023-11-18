import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import api from "../../axiosConfig/axios";
import Cargando from "../Cargando/Cargando";
import ErrorModal from "../ErrorModal/ErrorModal";
import ToastSuccuess from "../Toast/Toast";
import { useSearchParams } from "react-router-dom";
import styles from "./NuevaSalida.module.css";
import Buscador from "../Buscador/buscador";

function NuevaSalida(props) {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [valid, setValid] = useState(true);
  const [precio, setPrecio] = useState(0);
  const [salidaInfo, setSalidaInfo] = useState({
    nombreProducto: "",
    cantidadSaliente: "",
    motivo: "Venta",
    nota: "",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const getProductos = () => {
    api
      .get("/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        setTituloError("Error con el servidor");
        setCuerpoError(
          `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
        );
        setModal(true);
      });
  };

  const generarsalida = (event) => {
    event.preventDefault();
    const found = productos.find(
      (prodcuto) => prodcuto.nombre === salidaInfo.nombreProducto
    );
    if (!found) {
      setTituloError("Producto no encontrado");
      setCuerpoError("Asegurese de escribir bien el nombre del producto");
      setModal(true);
    } else {
      api
        .post("salidas/hoy", salidaInfo)
        .then((response) => {
          setSalidaInfo({
            nombreProducto: "",
            cantidadSaliente: 0,
            motivo: "Venta",
            nota: "",
          });
          setSearchParams((params) => {
            params.delete("nombre");
            return params;
          });
          setPrecio(0);
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
              console.log(error);
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

  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    if (key === "nombreProducto") {
      setShowSearch(true);
      const found = productos.find((prodcuto) => prodcuto.nombre === value);
      if (!found) {
        setValid(false);
      } else {
        setValid(true);
        setPrecio(found.precioDeVenta);
      }
    }
    setSalidaInfo({ ...salidaInfo, [key]: value });
  };
  const handleSelect = (name) => {
    setSalidaInfo({ ...salidaInfo, nombreProducto: name });
    setShowSearch(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("nombre");

  useEffect(() => {
    const found = productos.find(
      (prodcuto) => prodcuto.nombre === salidaInfo.nombreProducto
    );
    if (!found) {
      setValid(false);
    } else {
      setValid(true);
      setPrecio(found.precioDeVenta);
    }
  }, [salidaInfo, productos]);

  useEffect(() => {
    if (params) {
      setSalidaInfo({ ...salidaInfo, nombreProducto: params });
    }
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Container>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      ></ErrorModal>
      <Form onSubmit={generarsalida}>
        <Form.Group className="mb-3" controlId="nombreProducto">
          <Form.Label>Nombre del producto a salir:</Form.Label>
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Nombre del Producto salir"
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                setShowSearch(false);
              }, 200);
            }}
            onFocus={() => {
              setShowSearch(true);
            }}
            value={salidaInfo.nombreProducto}
            required
          />

          {showSearch && (
            <div className={styles.divAutoComplete}>
              {Buscador(productos, salidaInfo.nombreProducto.toLowerCase())
                .map((prducto) => {
                  return (
                    salidaInfo.nombreProducto !== prducto.nombre && (
                      <div
                        onClick={() => {
                          handleSelect(prducto.nombre);
                        }}
                        className={styles.opciones}
                        value={prducto.nombre}
                        key={prducto.id}
                      >
                        {prducto.nombre}
                      </div>
                    )
                  );
                })
                .slice(0, 10)}
            </div>
          )}
          {valid || salidaInfo.nombreProducto === "" ? null : (
            <Form.Text style={{ color: "red" }}>Producto no valido</Form.Text>
          )}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="cantidadSaliente">
              <Form.Label>Cantidad Saliendo:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad Saliendo"
                onChange={handleChange}
                value={salidaInfo.cantidadSaliente}
              />
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group className="mb-3" controlId="motivo">
              <Form.Label>Motivo de la salida:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                defaultValue={"Venta"}
                onChange={handleChange}
                value={salidaInfo.motivo}
                id="motivo"
              >
                <option disabled>Open this select menu</option>
                <option value="Venta">Venta</option>
                <option value="Robo">Robo</option>
                <option value="Perdida">Perdida</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Precio del producto: </Form.Label>
              <Form.FloatingLabel>{`${precio} $`}</Form.FloatingLabel>
            </Col>
            <Col>
              <Form.Label>Valor de la salida: </Form.Label>
              <Form.FloatingLabel>
                {`${precio * salidaInfo.cantidadSaliente} $`}
              </Form.FloatingLabel>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="nota">
          <Form.Label>Notas: </Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Notas adicionales"
            onChange={handleChange}
            value={salidaInfo.nota}
          />
        </Form.Group>

        <Button style={{ backgroundColor: "#00325b" }} type="submit">
          {loading ? <Cargando></Cargando> : "Generar salida"}
        </Button>
      </Form>
      <ToastSuccuess showToast={showToast} toggleShowToast={toggleShowToast} />
    </Container>
  );
}

export default NuevaSalida;
