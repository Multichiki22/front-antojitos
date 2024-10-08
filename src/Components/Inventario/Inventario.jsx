import Table from "react-bootstrap/Table";
import api from "../../axiosConfig/axios";
import { useEffect, useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import Cargando from "../Cargando/Cargando";
import Container from "react-bootstrap/esm/Container";
import ButtonSelection from "../ButtonSelection/ButtonSelection";
import formatNumbers from "../../utilities/formatNumbers";

function Inventario() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductos();
  }, []);

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
      })
      .finally(() => setLoading(false));
    setLoading(true);
  };

  return (
    <>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      ></ErrorModal>
      {loading ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Cargando></Cargando>
        </Container>
      ) : (
        <Table striped="columns" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Categoria</th>
              <th>Precio de venta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => {
              return (
                <tr>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.categoria.nombre}</td>
                  <td>{`$ ${formatNumbers(producto.precioDeVenta)}`}</td>
                  <td><ButtonSelection producto={producto}></ButtonSelection></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Inventario;
