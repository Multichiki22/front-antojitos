import Table from "react-bootstrap/Table";
import api from "../../axiosConfig/axios";
import { useEffect, useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import Cargando from "../Cargando/Cargando";
import Container from "react-bootstrap/esm/Container";

function Users() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    api
      .get("/users")
      .then((response) => {
        setUsers(response.data);
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
              <th>Creado el:</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{user.role.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Users;