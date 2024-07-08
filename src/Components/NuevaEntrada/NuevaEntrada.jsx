import ErrorModal from "../ErrorModal/ErrorModal";
import api from "../../axiosConfig/axios";
import Cargando from "../Cargando/Cargando";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ToastSuccuess from "../Toast/Toast";


import styles from "./NuevaEntrada.module.css"
import Buscador from "../Buscador/buscador";
import formatNumbers from "../../utilities/formatNumbers";
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';

function NuevaEntrada() {
  const { showError, showSuccess } = useSnackBar();
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);
  const [showSearch, setShowSearch] = useState(false);

  const [productos, setProductos] = useState([]);
  const [valid, setValid] = useState(true);
  const [entradaInfo, setEntradaInfo] = useState({
    nombreProducto: "",
    cantidadPorPaquete: "",
    costoPorPaquete: "",
    cantidadDePaquetes: 1,
    cambioDePrecio: false,
    nuevoPrecio: "",
  });

  const getProductos = () => {
    api
      .get("/productos/vigentes")
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
  const handelChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    if (key === "nombreProducto") {
      const found = productos.find((prodcuto) => prodcuto.nombre === value);
      if (!found) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
    setEntradaInfo({ ...entradaInfo, [key]: value });
  };
  const handleNewPrice = (event) => {
    const key = event.target.id;
    setEntradaInfo({ ...entradaInfo, [key]: !entradaInfo[key] });
  };
  const handleSelect = (name) => {
    setEntradaInfo({ ...entradaInfo, nombreProducto: name });
    setShowSearch(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = productos.find(
      (prodcuto) => prodcuto.nombre === entradaInfo.nombreProducto
    );
    if (!found) {
      setTituloError("Producto no encontrado");
      setCuerpoError("Asegurese de escribir bien el nombre del producto");
      setModal(true);
    } else {
      setLoading(true);
      api
        .post("entradas", entradaInfo)
        .then((response) => {
          showSuccess("Entrada generada exitosamente")
          setEntradaInfo({
            nombreProducto: "",
            cantidadPorPaquete: "",
            costoPorPaquete: "",
            cantidadDePaquetes: 1,
            cambioDePrecio: false,
            nuevoPrecio: 0,
          });
          setShowToast(true);
        })
        .catch((error) => {
          console.log(error.response);
          showError(error.response?.data?.message || "error inesperado")
        })
        .finally(() => {
          setLoading(false);
        });
      
    }
  };
  const costoUnidad =
    entradaInfo.costoPorPaquete / entradaInfo.cantidadPorPaquete;
  const valorEntrada =
    entradaInfo.costoPorPaquete * entradaInfo.cantidadDePaquetes;
  const cantidadTotalAEntrar =
    entradaInfo.cantidadDePaquetes * entradaInfo.cantidadPorPaquete;
  const ganaciaUnidad = entradaInfo.nuevoPrecio - costoUnidad;
  const porcentajeGanancia = Math.round(
    ((entradaInfo.nuevoPrecio - costoUnidad) / entradaInfo.nuevoPrecio) * 100
  );

  useEffect(() => {
    getProductos();
  }, []);

  useEffect(() => {
    const found = productos.find(
      (prodcuto) => prodcuto.nombre === entradaInfo.nombreProducto
    );
    if (!found) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [entradaInfo, productos]);

  return (
    <Container>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      ></ErrorModal>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombreProducto">
          <Form.Label>Nombre del producto a entrar:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del Producto a entrar"
            onChange={handelChange}
            value={entradaInfo.nombreProducto}
            onBlur={() => {
              setTimeout(() => {
                setShowSearch(false);
              },200);
            }}
            onFocus={() => {
              setShowSearch(true);
            }}
          />
            {showSearch && (
            <div
              className={styles.divAutoComplete}
            >
              {Buscador(productos, entradaInfo.nombreProducto.toLowerCase())
                .map((prducto) => {
                  return (
                    entradaInfo.nombreProducto !== prducto.nombre && (
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
          {valid || entradaInfo.nombreProducto === "" ? null : (
            <Form.Text style={{ color: "red" }}>Producto no valido</Form.Text>
          )}
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="cantidadPorPaquete">
              <Form.Label>Unidades por paquete:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unidades por paquete"
                onChange={handelChange}
                value={entradaInfo.cantidadPorPaquete}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="costoPorPaquete">
              <Form.Label>Costo por paquete:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Costo por paquete"
                onChange={handelChange}
                value={entradaInfo.costoPorPaquete}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="cantidadDePaquetes">
              <Form.Label>Cantidad de paquetes:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad de paquetes comprados:"
                onChange={handelChange}
                value={entradaInfo.cantidadDePaquetes}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Valor de la entrada: </Form.Label>
              <Form.FloatingLabel>{`${formatNumbers(valorEntrada)} $`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Costo de cada unidad: </Form.Label>
              <Form.FloatingLabel>{`${formatNumbers(costoUnidad)} $`}</Form.FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad Total de productos a entrar: </Form.Label>
              <Form.FloatingLabel>
                {`${cantidadTotalAEntrar} `}
              </Form.FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="cambioDePrecio"
              label="Cambio de precio"
              onChange={handleNewPrice}
              checked={entradaInfo.cambioDePrecio}
            />
          </Form.Group>
        </Row>
        {entradaInfo.cambioDePrecio ? (
          <>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="nuevoPrecio">
                  <Form.Label>Nuevo precio de venta del producto:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Precio de venta del producto"
                    onChange={handelChange}
                    value={entradaInfo.nuevoPrecio}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Ganancia de cada unidad: </Form.Label>
                  <Form.FloatingLabel>{`${formatNumbers(ganaciaUnidad)} $`}</Form.FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Porcentaje de Ganancia: </Form.Label>
                  <Form.FloatingLabel>{`${formatNumbers(porcentajeGanancia)}%`}</Form.FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </>
        ) : null}
        <Button  style={{backgroundColor: "#00325b"}} type="submit">
        {loading ? <Cargando></Cargando> : "Generar entrada"}
        </Button>
        <ToastSuccuess showToast={showToast} toggleShowToast={toggleShowToast} />
      </Form>
    </Container>
  );
}

export default NuevaEntrada;
