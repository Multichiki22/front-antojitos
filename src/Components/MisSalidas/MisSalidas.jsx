import Table from "react-bootstrap/Table";
import api from "../../axiosConfig/axios";
import { useState, useEffect } from "react";
import Cargando from "../Cargando/Cargando";
import ErrorModal from "../ErrorModal/ErrorModal";
import formatNumbers from "../../utilities/formatNumbers";
function MisSalidas() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [salidas, setSalidas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSalidas();
  }, []);

  const getSalidas = () => {
    api
      .get("salidas/hoy/misSalidas")
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
            </tr>
          </thead>

          {salidas.length === 0 ? (
            <tbody>
              <tr style={{ textAlign: "center", color: "red", fontSize: 20 }}>
                <td colSpan={7}>No tienes salidas hoy hasta el momento</td>
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

export default MisSalidas;
