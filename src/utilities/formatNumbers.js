const formatNumbers = (value) => {
  if (!!value){
    const cleanValue = value.toString().replace(/[^0-9]/g, "");
    const valor = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return valor
  }
   return value
  };

export default formatNumbers