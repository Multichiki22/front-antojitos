import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import formatNumbers from '../../utilities/formatNumbers';

function ResumenGeneral(props) {
  const { resumen } = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Resumen: </Card.Title>
        {resumen.motivo && Object.entries(resumen.motivo).map(([motivo, datos]) => (
          <>
            <Card.Text>{`Cantidad ${motivo}: ${datos.cantidad}`}</Card.Text>
            <Card.Text>{`Valor ${motivo}: ${formatNumbers(datos.valor)} $`}</Card.Text>
          </>
        ))}

        <Card.Subtitle>Notas:</Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {resumen.notas && resumen.notas.map((nota) => {
          if (nota !== '') {
            return <ListGroup.Item>{nota}</ListGroup.Item>;
          }
          return null;
        })}
      </ListGroup>
    </Card>
  );
}

export default ResumenGeneral;
