import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import api from "../../axiosConfig/axios";
import ErrorModal from "../ErrorModal/ErrorModal";
import Cargando from "../Cargando/Cargando";
import formatNumbers from "../../utilities/formatNumbers";

function Salidas(props) {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    getSalidas();
  }, []);

  const getSalidas = () => {
    api
      .get("salidas/hoy/salidas")
      .then((response) => {
        setSalidas(response.data);
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
        <Cargando></Cargando>
      ) : (
        <Table striped="columns" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cantidad Salida</th>
              <th>Valor Salida</th>
              <th>Motivo</th>
              <th>Fecha y Hora</th>
              <th>Nota</th>
              <th>Usuario</th>
            </tr>
          </thead>

          {salidas.length === 0 ? (
            <tbody>
              <tr style={{ textAlign: "center", color: "red", fontSize: 20 }}>
                <td colSpan={7}>No hay salidas hoy hasta el momento</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {salidas.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.producto.nombre}</td>
                    <td>{element.cantidad}</td>
                    <td>{`$ ${formatNumbers(element.valorSalida)}`}</td>
                    <td>{element.motivo.nombre}</td>
                    <td>{element.fecha}</td>
                    <td>{element.nota}</td>
                    <td>{element.usuario || "User"}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      )}
    </>
  );
}

export default Salidas;
