import Container from "react-bootstrap/esm/Container";
import styles from "./Welcome.module.css"
import logoAntojitos from "../../Assets/Images/LogoTextoCentrado.png"
function Welcome() {
  return (
    <Container className={styles.container}>
      <h1 className={styles.titulo}>Bienvenido</h1>
      <h3 className={styles.user}>{localStorage.getItem("user")}</h3>
      <img src={logoAntojitos} alt="Logo antojitos" className={styles.logo}/>
    </Container>
  );
}
export default Welcome;
