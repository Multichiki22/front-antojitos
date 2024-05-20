import ServiceBase from './ServiceBase.ts';

const salidasHoyService = {
  ...ServiceBase,
  entidad: 'Salida',

  crearSalida: async(data) => {
    return await ServiceBase.post('salidas/hoy', data).catch((error) => {
      throw error;
    });
  },
};

export default salidasHoyService;
