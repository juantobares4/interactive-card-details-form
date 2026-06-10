const formCardNumber = document.getElementById('inputCardNumber');
const formCardholder = document.getElementById('inputCardholder');

const cardNumberText = document.getElementById('cardNumber');
const cardholderText = document.getElementById('cardholder');

const renderNumberCard = (value = null) => {
  const exampleNumber = '0000 0000 0000 0000';

  cardNumberText.textContent = value || exampleNumber;

};

const renderCardholderName = (name = null) => {
  const exampleName = 'Jane Appleseed';

  cardholderText.textContent = name || exampleName;

};

const handleFormDataInput = () => { 
  const excludeLetters = /[a-zA-Z]/;
  const allowLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

  formCardNumber.addEventListener('input', (event) => {
    if (excludeLetters.test(event.target.value)) return;

    const inputLength = event.target.value.length;
    const numberCard = event.target.value;
      
    if (inputLength === 4 || inputLength === 9 || inputLength === 14) {
      event.target.value = numberCard + ' ';
      cardNumberText.textContent = numberCard + ' ';
      
    };
    
    renderNumberCard(event.target.value);
  
  });

  formCardholder.addEventListener('input', (event) => {
    const inputCardholderName = event.target.value.trim();

    if (!allowLetters.test(inputCardholderName)) return;

    renderCardholderName(inputCardholderName);

  });

};

const handleFormDataSubmit = () => {


};

const main = () => {
  renderNumberCard();
  renderCardholderName();
  handleFormDataInput();

};

main();