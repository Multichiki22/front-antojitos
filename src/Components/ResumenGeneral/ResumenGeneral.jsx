import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import formatNumbers from "../../utilities/formatNumbers";

function ResumenGeneral(props) {
    const {resumen} = props
    return (
        <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Resumen: </Card.Title>
          <Card.Text>{`Cantidad de productos: ${resumen.cantidadDeProductos}`}</Card.Text>
          <Card.Text>{`Producido del dia: ${formatNumbers(resumen.valorDelDia)} $`}</Card.Text>
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
    )
}

export default ResumenGeneral