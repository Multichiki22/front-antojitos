import Container from "react-bootstrap/esm/Container";
import SeleccionFecha from "../../Components/SeleccionFecha/SeleccionFecha";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import api from "../../axiosConfig/axios";
import extractorDeFechas from "../../utilities/extractorDeFecha";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import TablaSalidas from "../../Components/TablaSalidas/TablaSalidas";
import ResumenGeneral from "../../Components/ResumenGeneral/ResumenGeneral";
import Form from "react-bootstrap/Form";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";

function Historico() {
  /* <--------------- Modal Error -------------------> */
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);

  /* <--------------- Logica negocio -------------------> */
  const [startDate, setStartDate] = useState(new Date());
  const [salidas, setSalidas] = useState({});
  const [resumenes, setResumenes] = useState({});
  const [modeList, setModeList] = useState(true);
  const [activeKey, setActiveKey] = useState("Total");

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  const handleSwitchMode = () => {
    setModeList(!modeList);
  };

  const handleSearch = () => {
    api
      .get(
        `salidas/historico/fecha/lista?fecha=${extractorDeFechas(startDate)}`
      )
      .then((response) => {
        setSalidas(response.data);
      })
      .catch((error) => {
        if (error.response) {
            setTituloError("Error con los datos");
            setCuerpoError(
              error.response.data.message.toString().replace(",", ".\n")
            );
            setModal(true);
        } else {
          setTituloError("Error con el servidor");
          setCuerpoError(
            `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
          );
          setModal(true);
        }
      });
    api
      .get(
        `salidas/historico/fecha/resumenes?fecha=${extractorDeFechas(
          startDate
        )}`
      )
      .then((response) => {
        setResumenes(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setTituloError("Error con los datos");
          setCuerpoError(
            error.response.data.message.toString().replace(",", ".\n")
          );
          setModal(true);
      } else {
        setTituloError("Error con el servidor");
        setCuerpoError(
          `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
        );
        setModal(true);
      }
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
      <Row>
        <Col
          style={{
            display: "flex",
            padding: "1%",
            alignItems: "center",
            gap: "2%",
          }}
        >
          <SeleccionFecha setStartDate={setStartDate} startDate={startDate} />
          <Button onClick={handleSearch}>Buscar</Button>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "center",
            gap: "1%",
          }}
        >
          <Form.Check
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
            type="switch"
            id="custom-switch"
            label="Cambio de vista"
            onChange={handleSwitchMode}
          />
        </Col>
      </Row>
      <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
        <Nav variant="tabs" className="justify-content-center">
          {Object.keys(salidas).map((user) => {
            return (
              <Nav.Item>
                <Nav.Link
                  style={{
                    backgroundColor: activeKey === user ? "#0b5ed7" : "white",
                    fontWeight: activeKey === user ? "bolder" : "normal",
                    fontSize: activeKey === user ? "large" : "medium",
                    color: activeKey === user ? "white" : "#0b5ed7",
                  }}
                  eventKey={user}
                >
                  {user}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        {modeList &&
          Object.keys(salidas).map((user) => {
            return (
              <Tab.Content style={{ padding: 0, margin: 0 }}>
                <Tab.Pane eventKey={user}>
                  <TablaSalidas
                    salidas={salidas[user]}
                    usuario={false}
                  ></TablaSalidas>
                </Tab.Pane>
              </Tab.Content>
            );
          })}
        {!modeList &&
          Object.keys(resumenes).map((user) => {
            return (
              <Tab.Content
                style={{
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Tab.Pane eventKey={user} style={{ padding: "1%" }}>
                  <ResumenGeneral resumen={resumenes[user]}></ResumenGeneral>
                </Tab.Pane>
              </Tab.Content>
            );
          })}
      </Tab.Container>
    </Container>
  );
}
export default Historico;
