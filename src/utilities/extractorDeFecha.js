const extractorDeFechas = (fecha)=>{
// Obtener los componentes de la fecha
let año = fecha.getFullYear();
let mes = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript van de 0 a 11!
let dia = fecha.getDate();

// Formatear la fecha como "yyyy-mm-dd"
if (mes < 10) {
    mes = '0' + mes; // Agregar un cero al mes si es menor que 10
}

if (dia < 10) {
    dia = '0' + dia; // Agregar un cero al día si es menor que 10
}

return `${año}-${mes}-${dia}`;
}

export default extractorDeFechas