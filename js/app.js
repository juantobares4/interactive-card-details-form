const formCardNumber = document.getElementById('inputCardNumber');
const cardNumberText = document.getElementById('cardNumber');

const handleFormDataInput = () => {
  const regex = /[a-zA-Z]/;

  formCardNumber.addEventListener('input', (event) => {
    if (regex.test(event.target.value)) return;

    const inputLength = event.target.value.length;
    let numberCard = event.target.value;
    
    cardNumberText.textContent = numberCard;
    
    if (inputLength === 4 || inputLength === 9 || inputLength === 14) {
      event.target.value = numberCard + ' ';
      cardNumberText.textContent = numberCard + ' ';

    };

    
  });

};

const handleFormDataSubmit = () => {


};

const main = () => {
  handleFormDataInput();

};

main();