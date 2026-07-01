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

export const getCurrentYear = () => {
  return new Date().getFullYear();

};

export const sliceString = (text, start, end) => {
  return String(text).slice(start, end);

};

export const getFormData = (form) => {
  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());

};

export const validateFormData = (data) => {
  const objectData = {
    isValidForm: false,
    message: '',
    invalidField: null

  };

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      objectData.message = "Can't be blank";
      objectData.invalidField = ['year', 'month'].includes(key) ? 'date' : key;
  
      return objectData;
      
    } else {
      if (key === 'cardholder') {
        if (!getRegExp('letters').test(value)) {
          objectData.message = 'Wrong format, letters only';
          objectData.invalidField = key;

          return objectData;
        };

      } else if (key === 'cardNumber' || key === 'cvc') {
        if (!getRegExp('numbers').test(value)) {
          objectData.message = 'Wrong format, numbers only';
          objectData.invalidField = key;
        
          return objectData;
        } else if ((key === 'cardNumber' && String(value).length < 19) || key === 'cvc' && String(value).length < 3) {
          objectData.message = 'Wrong format, incorrect length';
          objectData.invalidField = key;          

          return objectData;
        };

      } else if (key === 'month') {
        if (!getRegExp('month').test(value)) {
          objectData.message = 'Invalid month';
          objectData.invalidField = 'date';
          
          return objectData;
        };
      
      } else if (key === 'year') {
        if (value < Number(sliceString(getCurrentYear(), 2)) || (!getRegExp('numbers').test(value))) {
          objectData.message = 'Invalid year';
          objectData.invalidField = 'date';

          return objectData;
        };

      };

    };
      
  };
  
  objectData.message = `We've added your card details`;
  objectData.isValidForm = true;
  
  return objectData;

};