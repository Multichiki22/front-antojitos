import Servicebase from './ServiceBase.ts';

const entradasService = {
  ...Servicebase,

  entidad: 'Entradas',

  getHistoricoFecha: async (fecha: string) => {
    return await Servicebase.get(`entradas/historico/fecha/lista?fecha=${fecha}`).catch((error) => {
      throw error;
    });
  },
  getHistoricoProductos: async (productoId: string) => {
    return await Servicebase.get(`entradas/historico/producto/lista?producto=${productoId}`).catch((error) => {
      throw error;
    });
  },
};

export default entradasService;
