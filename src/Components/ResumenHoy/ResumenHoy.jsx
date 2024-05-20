import Container from 'react-bootstrap/esm/Container';
import { useState, useEffect } from 'react';
import Cargando from '../Cargando/Cargando';
import api from '../../axiosConfig/axios';
import ErrorModal from '../ErrorModal/ErrorModal';
import ResumenGeneral from '../ResumenGeneral/ResumenGeneral';

function ResumenHoy() {
  const [modal, setModal] = useState(false);
  const [tituloError, setTituloError] = useState('');
  const [cuerpoError, setCuerpoError] = useState('');
  const handleClose = () => setModal(false);
  const [loading, setLoading] = useState(false);
  const [resumen, setResumen] = useState({
    motivo: {},
    notas: [],
  });

  const getResumen = () => {
    setLoading(true);
    api
      .get('salidas/hoy/miresumen')
      .then((response) => {
        setResumen(response.data);
      })
      .catch((error) => {
        setTituloError('Error con el servidor');
        setCuerpoError(`Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`);
        setModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getResumen();
  }, []);
  return (
    <Container>
      <ErrorModal show={modal} handleClose={handleClose} title={tituloError} body={cuerpoError} />
      {loading ? <Cargando /> : <ResumenGeneral resumen={resumen}></ResumenGeneral>}
    </Container>
  );
}

export default ResumenHoy;
