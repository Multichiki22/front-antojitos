import Toast from "react-bootstrap/esm/Toast";

function ToastSuccuess(props) {
  const { showToast, toggleShowToast } = props;
  return (
    <Toast
      bg="success"
      style={{ position: "absolute", bottom: "10px", left: "20px" }}
      show={showToast}
      onClose={() => toggleShowToast()}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Enviado</strong>
      </Toast.Header>
      <Toast.Body>
        <b>La informacion fue enviada de manera exitosa</b>
      </Toast.Body>
    </Toast>
  );
}
export default ToastSuccuess;
