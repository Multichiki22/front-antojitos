import Table from "react-bootstrap/Table";
import api from "../../axiosConfig/axios";
import { useEffect, useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import Cargando from "../Cargando/Cargando";
import Container from "react-bootstrap/esm/Container";

function Categorias() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = () => {
    api
      .get("/categorias")
      .then((response) => {
        setCategorias(response.data);
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
    <Container>
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
              <th>Cantidad de productos</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => {
              return (
                <tr>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria["_count"]["productos"]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Categorias;
