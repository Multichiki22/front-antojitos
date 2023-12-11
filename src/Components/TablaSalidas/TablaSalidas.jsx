import Table from "react-bootstrap/Table";
import formatNumbers from "../../utilities/formatNumbers";
function TablaSalidas(props){
  const {salidas, usuario} = props
    return (
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
            {usuario && <th>Usuario</th>}
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
            {salidas.map((salida) => {
              return (
                <tr>
                  <td>{salida.id}</td>
                  <td>{salida.producto.nombre}</td>
                  <td>{salida.cantidad}</td>
                  <td>{`$ ${formatNumbers(salida.valorSalida)}`}</td>
                  <td>{salida.motivo.nombre}</td>
                  <td>{salida.fecha}</td>
                  <td>{salida.nota}</td>
                  {usuario && <td>{salida.usuario}</td>}
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    )
}
export default TablaSalidas