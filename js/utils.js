export const getRegExp = (type) => {
  switch (type) {
    case 'letters':
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

      break;
  
    case 'numbers':
      return /^[\d\s]*$/;

      break;
  
    case 'month':
      return /^(|0?[1-9]|1[0-2])$/;

      break;

    default:
      return null;

  };
  
};

export const sliceString = (text, start, end) => {
  return String(text).slice(start, end);

};