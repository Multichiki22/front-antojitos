function Buscador(productos, busqueda) {
    const palabrasBusqueda = busqueda.toLowerCase().split(' ');
  
const productosFlitrados =  productos.filter(producto => {
      const nombreProducto = producto.nombre.toLowerCase();
      return palabrasBusqueda.every(palabra => nombreProducto.includes(palabra));
    });
    productosFlitrados.sort((a, b)=>{
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA.startsWith(palabrasBusqueda[0]) && !nombreB.startsWith(palabrasBusqueda[0])) {
        return -1;
      } else if (!nombreA.startsWith(palabrasBusqueda[0]) && nombreB.startsWith(palabrasBusqueda[0])) {
        return 1; 
      }
  
      return 0; 
    })
    return productosFlitrados
  }
  
  export default Buscador