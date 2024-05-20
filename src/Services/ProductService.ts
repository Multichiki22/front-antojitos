import ServiceBase from './ServiceBase.ts';

const productService = {
  ...ServiceBase,

  entidad: 'productos',

  crearProducto: async(data) => {
    return await ServiceBase.post('productos', data).catch((error) => {
      throw error;
    });
  },
  getVigentes: async()=>{
    return await ServiceBase.get('productos/vigentes').catch((error) =>{
      throw error;
    })
  },
  getProductosActuales: async()=>{
    return await ServiceBase.get('productos').catch((error) =>{
      throw error;
    })
  }
};

export default productService;
