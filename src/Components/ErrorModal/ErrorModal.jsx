import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ErrorModal(props) {
const {handleClose, show} = props
const {title, body, boton} = props

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title || "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body || "Ha ocurrido un error"}</Modal.Body>
        <Modal.Footer>
          <Button  style={{backgroundColor: "#00325b"}} onClick={handleClose}>
            {boton || "cerrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;