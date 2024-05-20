import api from "../axiosConfig/axios";

const handleResponse = (response: any) => {
  return response.data;
};

const handleError = (error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 500) {
      throw new Error(
        "El servidor no respondio, revise su conexion a internet o consulte con soporte tecnico: "
      );
    }
    if (status === 400) {
      throw new Error(
        "Error con los datos: " +
          error.response.data.message.toString().replace(",", ".\n")
      );
    }
    if (status === 404) {
      throw new Error(
        "No encontrado: Asegúrate de escribir correctamente los datos solicitados"
      );
    }
  } else {
    throw new Error(
      `Error con el servidor: Ha ocurrido un error con el servidor intentalo mas tarde: \n Error Name: ${error.message}`
    );
  }
};

const ServiceBase = {
  get: async (url: string) => {
    return await api.get(url).then(handleResponse).catch(handleError);
  },
  post: async (url: string, data: any) => {
    return await api.post(url, data).then(handleResponse).catch(handleError);
  },
  put: async (url: string, data: any) => {
    return await api.post(url, data).then(handleResponse).catch(handleError);
  },
  delete: async (url: string, data: any) => {
    return await api.post(url, data).then(handleResponse).catch(handleError);
  },
};

export default ServiceBase;
