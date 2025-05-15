import Categoria from '../entities/categorias.ts';
import Servicebase from './ServiceBase.ts';

const categoriaService = {
  ...Servicebase,

  entidad: 'Categoria',

  getAll : async ():  Promise<Categoria[]> => {
    return await Servicebase.get('categorias').catch((error) => {
      throw error;
    });
  },
};

export default categoriaService;
