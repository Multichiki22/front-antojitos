const formatNumbers = (value: any): string => {
  // Check if value is valid
  if (!value && value !== 0) return '';
  
  // Convert to number if string
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (num === Infinity) return '' 
  
  // Verify it's a valid number
  if (typeof num !== 'number' || isNaN(num)) return '';
  
  // Handle negative numbers
  const isNegative = num < 0;
  const absValue = Math.abs(num);
  
  // Split into integer and decimal parts
  const [integerPart, decimalPart] = absValue.toString().split('.');
  
  // Format integer part with separators (commas for thousands, apostrophes for millions)
  const formattedInteger = integerPart.split('').reverse()
    .reduce((acc, digit, i) => {
      if (i > 0 && i % 3 === 0) {
        if (i <= 3) {
          return digit + ',' + acc;
        } else {
          return digit + '\'' + acc;
        }
      }
      return digit + acc;
    }, '');
  
  // Format decimal part (limit to 2 places)
  const formattedDecimal = decimalPart 
    ? '.' + (decimalPart.length > 2 ? decimalPart.slice(0, 2) : decimalPart.padEnd(2, '0'))
    : '.00';
    
  return (isNegative ? '-' : '') + formattedInteger + formattedDecimal;
};

export default formatNumbers;