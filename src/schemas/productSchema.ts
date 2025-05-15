import * as Yup from 'yup';

export const nuevoProductoValidationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre del producto es requerido'),
  categoria: Yup.string().required('La categoría es requerida'),
  precioDeVenta: Yup.number()
    .required('El precio de venta es requerido')
    .min(0, 'El precio debe ser mayor o igual a 0'),
  cantidadPorPaquete: Yup.number()
    .required('Las unidades por paquete son requeridas')
    .integer('Debe ser un número entero')
    .min(1, 'Debe ser al menos 1'),
  costoPorPaquete: Yup.number()
    .required('El costo por paquete es requerido')
    .min(1, 'Debe ser al menos 1'),
  cantidadDePaquetes: Yup.number()
    .required('La cantidad de paquetes es requerida')
    .integer('Debe ser un número entero')
    .min(1, 'Debe ser al menos 1'),
});

export const initialProductValues = {
  nombre: '',
  categoria: '',
  precioDeVenta: 0,
  cantidadPorPaquete: 0,
  costoPorPaquete: 0,
  cantidadDePaquetes: 0,
  };