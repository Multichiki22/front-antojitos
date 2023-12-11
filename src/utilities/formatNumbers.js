const formatNumbers = (value) => {
    const valor = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return valor
  };

export default formatNumbers