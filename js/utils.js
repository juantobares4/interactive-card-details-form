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

export const getFormData = (form) => {
  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());

};

export const validateFormData = (data) => {
  let objectData = {
    isValidForm: false,
    message: ''

  };

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      objectData.message = "Can't be blank";
  
      return objectData;
      
    } else {
      if (key === 'cardholder') {
        if (!getRegExp('letters').test(value)) {
          objectData.message = 'Wrong format, letters only';

          return objectData;
        };

      } else if (key === 'cardNumber' || key === 'cvc') {
        if (!getRegExp('numbers').test(value)) {
          objectData.message = 'Wrong format, numbers only';
        
          return objectData;
        };

      } else if (key === 'month') {
        if (!getRegExp('month').test(value)) {
          objectData.message = 'Wrong format';
          
          return objectData;
        };
      
      };

    };
      
  };
  
  objectData.message = `We've added your card details`;
  objectData.isValidForm = true;
  
  return objectData;


};