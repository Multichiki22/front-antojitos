import Servicebase from './ServiceBase.ts';

const categoriaService = {
  ...Servicebase,

  entidad: 'Categoria',

  getAll: async () => {
    return await Servicebase.get('categorias').catch((error) => {
      throw error;
    });
  },
};

export default categoriaService;
