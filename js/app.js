import { getCurrentYear, getFormData, getRegExp, sliceString, validateFormData } from "./utils.js";

const formCardNumber = document.getElementById('inputCardNumber');
const formCardholder = document.getElementById('inputCardholder');
const formMonthExpiry = document.getElementById('inputMonth');
const formYearExpiry = document.getElementById('inputYear');
const formCvcNumber = document.getElementById('inputCVC');

const cardNumberText = document.getElementById('cardNumber');
const cardholderText = document.getElementById('cardholder');
const expiryMonthText = document.getElementById('expiryMonth');
const expiryYearText = document.getElementById('expiryYear');
const cvcNumberText = document.getElementById('cvcNumber');

const renderNumberCard = (cardNumber = null) => {
  const exampleNumber = '0000 0000 0000 0000';

  cardNumberText.textContent = cardNumber || exampleNumber;

};

const renderCardholderName = (name = null) => {
  const exampleName = 'Jane Appleseed';

  cardholderText.textContent = name || exampleName;

};

const renderExpiryMonth = (month = null) => {
  expiryMonthText.textContent = month || '00';

};

const renderExpiryYear = (year = null) => {
  expiryYearText.textContent = year || '00';

};

const renderSecurityCode = (cvcCode = null) => {
  cvcNumberText.textContent = cvcCode || '000';

};

const activeStatesMessage = ({ element, msg }) => {
  const elementId = document.getElementById(`${element}Message`);

  elementId.textContent = msg;

};

const handleFormDataInput = () => { 
  const currentYear = getCurrentYear();
  const parseCurrentYear = Number(sliceString(currentYear, 2));

  formCardNumber.addEventListener('input', (event) => {
    const inputLength = event.target.value.length;
    const inputNumberCard = event.target.value.trim();
    
    if (!getRegExp('numbers').test(inputNumberCard)) return;
      
    if (inputLength === 4 || inputLength === 9 || inputLength === 14) {
      event.target.value = inputNumberCard + ' ';
      cardNumberText.textContent = inputNumberCard + ' ';
      
    };
    
    renderNumberCard(event.target.value);
  
  });

  formCardholder.addEventListener('input', (event) => {
    const inputCardholderName = event.target.value.trim();

    if (!getRegExp('letters').test(inputCardholderName)) return;

    renderCardholderName(inputCardholderName);

  });

  formMonthExpiry.addEventListener('input', (event) => {
    let inputMonthNumber = event.target.value;

    if (!getRegExp('month').test(inputMonthNumber)) return;

    if (inputMonthNumber.slice(0, 1) > 1) {
      inputMonthNumber = '0' + inputMonthNumber;

      event.target.value = inputMonthNumber;
      
      renderExpiryMonth(inputMonthNumber);

    };

    renderExpiryMonth(inputMonthNumber);

  });

  formYearExpiry.addEventListener('input', (event) => {
    const inputYearNumber = Number(event.target.value);

    const firstDigitInput = Number(sliceString(inputYearNumber, 0, 1));
    const firstDigitCurrentYear = Number(sliceString(parseCurrentYear, 0, 1));
    const secondDigitInput = Number(sliceString(inputYearNumber, 0, 2));
    const secondDigitCurrentYear = Number(sliceString(parseCurrentYear, 0, 2));

    if ((Number(firstDigitInput) >= Number(firstDigitCurrentYear))) {
      if (Number(secondDigitInput) >= Number(secondDigitCurrentYear)) {
        renderExpiryYear(inputYearNumber);

      } else {
        renderExpiryYear('00');

      };

    };
  
  });

  formCvcNumber.addEventListener('input', (event) => {
    const inputCvcNumber = event.target.value;

    if (!getRegExp('numbers').test(inputCvcNumber)) return;

    renderSecurityCode(inputCvcNumber);

  });

};

const handleFormDataSubmit = () => {
  const form = document.getElementById('formCardData');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formInfo = getFormData(form);
    const nameField = validateFormData(formInfo).invalidField;
    const message = validateFormData(formInfo).message;

    activeStatesMessage({ element: nameField, msg: message });

  });

};

const main = () => {
  renderNumberCard();
  renderCardholderName();
  renderExpiryMonth();
  renderExpiryYear();
  renderSecurityCode();
  handleFormDataInput();
  handleFormDataSubmit();

};

main();