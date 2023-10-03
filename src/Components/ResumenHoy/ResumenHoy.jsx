import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/esm/Container";
import { useState, useEffect } from "react";
import Cargando from "../Cargando/Cargando";
import api from "../../axiosConfig/axios";
import ErrorModal from "../ErrorModal/ErrorModal";

function ResumenHoy() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [resumen, setResumen] = useState({
    cantidadDeProductos: "??",
    notas: [],
    valorDelDia: "??",
  });

  const getResumen = () => {
    api
      .get("salidas/hoy/miresumen")
      .then((response) => {
        setResumen(response.data);
      })
      .catch((error) => {
        setTituloError("Error con el servidor");
        setCuerpoError(
          `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
        );
        setModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(true);
  };

  useEffect(() => {
    getResumen();
  }, []);
  return (
    <Container>
      <ErrorModal
        show={modal}
        handleClose={handleClose}
        title={tituloError}
        body={cuerpoError}
      />

      {loading ? (
        <Cargando />
      ) : (
        <Row className="justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Resumen hoy mis ventas: </Card.Title>
              <Card.Text>{`Cantidad de productos: ${resumen.cantidadDeProductos}`}</Card.Text>
              <Card.Text>{`Producido del dia: ${resumen.valorDelDia}`}</Card.Text>
              <Card.Subtitle>Notas:</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {resumen.notas.map((nota)=>{
                if (nota !== "") {
                  return <ListGroup.Item>{nota}</ListGroup.Item>
                }
                return null
              })}
            </ListGroup>
          </Card>
        </Row>
      )}
    </Container>
  );
}

export default ResumenHoy;
