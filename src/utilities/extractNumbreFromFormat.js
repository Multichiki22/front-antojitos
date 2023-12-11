const extractNumberFromFormat = (valor) => {
    let valorEditar = valor
    valorEditar = valorEditar.toString().replace(/,/g, '');
    const numero = Number(valorEditar.replace(/\D/g, ''))
    if (!isNaN(numero)) {
       return numero
    }
    return valorEditar
  }

export default extractNumberFromFormat