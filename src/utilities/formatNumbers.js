const formatNumbers = (value) => {
  if (!!value){
    const valor = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return valor
  }
   return value
  };

export default formatNumbers