import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

const aprovedRoles = ["SuperAdmin", "Admin"];

function ButtonSelection(props) {
    const {producto }= props
  const [multiButton, setMultiButton] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      if (aprovedRoles.includes(role)) {
        setMultiButton(true);
      }
    }
  }, []);

  return (
    <div>
      {multiButton ? (
        <div style={{display: "flex", gap: "1%"}}>
          <Button
            style={{ backgroundColor: "#00325b",border:"none" }}
            href={`/vender?nombre=${producto.nombre}`}
          >
            Vender
          </Button>
{/*           <Button
            style={{ backgroundColor: "#00325b" }}
            href={`/vender?nombre=${producto.nombre}`}
          >
            Detalles
          </Button> */}
          <Button
            style={{ backgroundColor: "#00325b", border:"none" }}
            href={`/producto/editar/${producto.id}`}
          >
            Editar
          </Button>
        </div>
      ) : (
        <Button
          style={{ backgroundColor: "#00325b" }}
          href={`/vender?nombre=${producto.nombre}`}
        >
          Vender
        </Button>
      )}
    </div>
  );
}

export default ButtonSelection;
