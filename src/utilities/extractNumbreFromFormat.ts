const ExtractNumberFormat = (formattedValue: string): number => {
  // Si el valor está vacío o es null/undefined, retorna 0
  if (!formattedValue) return 0;

  try {
    // Limpia el string de todos los caracteres de formato excepto el punto decimal y el signo negativo
    const cleanValue = formattedValue
      .replace(/['\s,]/g, '') // Elimina comillas, espacios y comas
      .replace(/[^\d.-]/g, ''); // Mantiene solo dígitos, punto decimal y signo negativo

    // Convierte a número
    const number = parseFloat(cleanValue);
    
    // Retorna 0 si no es un número válido
    return isNaN(number) ? 0 : number;
  } catch (error) {
    // En caso de cualquier error durante la conversión, retorna 0
    return 0;
  }
};

export default ExtractNumberFormat;