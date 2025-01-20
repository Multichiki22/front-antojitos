import ServiceBase from './ServiceBase.ts';

const salidasHoyService = {
  ...ServiceBase,
  entidad: 'Salida',

  crearSalida: async(data) => {
    return await ServiceBase.post('salidas/hoy', data).catch((error) => {
      throw error;
    });
  },

  getHistoricoProductos: async (productoId: string) => {
    return await ServiceBase.get(`salidas/historico/producto/lista?producto=${productoId}`).catch((error) => {
      throw error;
    });
  },

  
  getHistoricoFecha: async (fecha: string) => {
    return await ServiceBase.get(`salidas/historico/fecha/lista?fecha=${fecha}`).catch((error) => {
      throw error;
    });
  },

  getHistoricoReviewFecha: async (fecha: string) => {
    return await ServiceBase.get(`salidas/historico/review/lista?fecha=${fecha}`).catch((error) => {
      throw error;
    });
  },
};

export default salidasHoyService;
