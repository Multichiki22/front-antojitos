import * as Yup from 'yup';

export const nuevaEntradaValidationSchema = Yup.object().shape({
  nombreProducto: Yup.string().required('El nombre del producto es requerido'),
  cantidadPorPaquete: Yup.number().required('La cantidad por paquete es requerida').min(1, 'La cantidad por paquete debe ser mayor a 1'),
  costoPorPaquete: Yup.number().required('El costo por paquete es requerido').min(1, 'El costo por paquete debe ser mayor o igual a 1').default(1),
  cantidadDePaquetes: Yup.number().required('La cantidad de paquetes es requerida').min(1, 'La cantidad de paquetes debe ser mayor a 1'),
  nuevoPrecio: Yup.number().when('cambioDePrecio', {
    is: true,
    then: (schema) =>
      schema.required('rEl nuevo precio es requerido cuando se cambia el precio').min(1, 'El nuevo pecio debe ser mayor o igual a 1'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const initialValues = {
  nombreProducto: '',
  cantidadPorPaquete: 1,
  costoPorPaquete: 0,
  cantidadDePaquetes: 1,
  cambioDePrecio: false,
  nuevoPrecio: 0,
};
