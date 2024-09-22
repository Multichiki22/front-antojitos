import { productoOriginal } from '../types/productoType.ts';
import ServiceBase from './ServiceBase.ts';

const productService = {
  ...ServiceBase,

  entidad: 'productos',

  crearProducto: async (data) => {
    return await ServiceBase.post('productos', data).catch((error) => {
      throw error;
    });
  },
  getVigentes: async () => {
    return await ServiceBase.get('productos/vigentes').catch((error) => {
      throw error;
    });
  },
  getProductosActuales: async () => {
    return await ServiceBase.get('productos').catch((error) => {
      throw error;
    });
  },
  getProductosById: async (productId: string) => {
    return await ServiceBase.get(`productos/${productId}`).catch((error) => {
      throw error;
    });
  },
  updateProducto: async (data : productoOriginal) => {
    return await ServiceBase.put(`productos/editarV2`, data).catch((error) => {
      throw error;
    });
  },
};

export default productService;
