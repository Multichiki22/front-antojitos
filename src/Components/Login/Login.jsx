import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "../../axiosConfig/axiosLogin";
import ErrorModal from "../ErrorModal/ErrorModal";
import Spinner from "../Cargando/Cargando";
import { useNavigate } from "react-router-dom";
import logoLogin from "../../Assets/Images/LogoCirculo.png"

function Login() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState("");
  const [cuerpoError, setCuerpoError] = useState("");
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", { user, password })
      .then((response) => {
        if (response.data.status === 403) {
          setTituloError("Error en inicio de sesion");
          setCuerpoError("Usuario o contraseña incorrectas");
          setModal(true);
        }
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("user", response.data.user);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setTituloError("Error en inicio de sesion");
            setCuerpoError("Debe proveer un usuario y contraseña");
            setModal(true);
          }
          if (error.response.status === 403) {
            setTituloError("Error en inicio de sesion");
            setCuerpoError("Usuario o contraseña incorrecta");
            setModal(true);
          }
          if (error.response.status === 500) {
            setTituloError("Error con el servidor");
            setCuerpoError(
              `Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
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
  };

  const handelChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    if (key === "user") setUser(value);
    if (key === "password") setPassword(value);
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "2vh",
          padding: "5%",
          backgroundColor: "#04c4d9",
          maxWidth: "400px",
        }}
      >
        <ErrorModal
          show={modal}
          handleClose={handleClose}
          title={tituloError}
          body={cuerpoError}
        ></ErrorModal>
        <Form className="text-center" onSubmit={handleSubmit}>


          <Image src={logoLogin} style={{height: "110px", width: "110px", padding:"5%"}}  roundedCircle/>
          <Form.Group className="mb-3 text-center" controlId="user">
            <Form.Label>Tu usuario:</Form.Label>
            <Form.Control
              className="text-center"
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={handelChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-center" controlId="password">
            <Form.Label>Tu contraseña:</Form.Label>
            <Form.Control
              className="text-center"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handelChange}
            />
          </Form.Group>
          <Button style={{backgroundColor: "#00325b"}} type="submit">
            {loading === true ? <Spinner /> : "Login"}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Login;
