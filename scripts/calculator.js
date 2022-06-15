const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equal-button');
const decimalButton = document.querySelector('#decimal-button');
const displayValueContainer = document.querySelector('.display-value');

let operator = '';
let displayTextValue = '';
let currentNum = null;
let firstNum = null;
let isFirstInput = false;
let isNegativeNumber = false;

let add = (number1, number2) => number1 + number2;
let subtract = (number1, number2) => number1 - number2;
let multiply = (number1, number2) => number1 * number2;
let divide = (number1, number2) => number1 / number2;

document.addEventListener('keypress', (button) => {
    let value = button.key;
    switch (value) {
        case '+':
            handleOperator(value);
            break;
        case '-':
            handleOperator(value);
            break;
        case '*':
            handleOperator(value);
            break;
        case '/':
            handleOperator(value);
            break;
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputDigit(button.innerText);
        updateDisplay();
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        handleOperator(button.innerText);
        updateDisplay();
    });
});

decimalButton.addEventListener('click', button => {
    inputDecimal('.');
    updateDisplay();
});

deleteButton.addEventListener('click', button => {
    deleteNum();
});

clearButton.addEventListener('click', button => {
    clear();
    updateDisplay();
});

equalsButton.addEventListener('click', button => {
    handleOperator(button.innerText);
    updateDisplay();
});

function inputDigit(num) {
    if (isFirstInput === true) {
        displayTextValue = num;
        isFirstInput = false;
    } 
    else {
        if (num === '0' && displayTextValue === '') {
            num;
        }
        else {
            displayTextValue += num.toString();
        }
    }
}

//disable decimal button if 'dot' symbol is added
function inputDecimal() {
    if (isFirstInput === true) {
        displayTextValue = '0.';
        isFirstInput = false;
        decimalButton.disabled = true;
        return;
    }

    if (!displayTextValue.includes('.')) {
        decimalButton.disabled = false;
        displayTextValue += '.';
    }
    else {
        decimalButton.disabled = true;
    }
}

//updates display with new display text value
function updateDisplay() {
    displayValueContainer.innerText = displayTextValue;
}

// remove last number in character string
// display to user
function deleteNum() {
    displayTextValue = displayTextValue.slice(0, -1);
    displayValueContainer.innerText = displayTextValue;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayTextValue);

    //overwrite previous operator if 2 operators were inputted consecutively
    if (operator && isFirstInput) {
        operator = nextOperator;
        return;
    }

    // verify that 'firstNum' is null and that the `inputValue`
    // is not a `NaN` value
    if (firstNum == null && !isNaN(inputValue)) {
        firstNum = inputValue;
    } 
    else if (operator || nextOperator === '=') {
        let result = operate(operator, firstNum, inputValue);

        if (nextOperator === '/') {
            displayTextValue = 'Cannot divide by 0';
        }

        displayTextValue = result.toString();
        firstNum = result;
    }

    isFirstInput = true;
    operator = nextOperator;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case '+':
            return add(number1, number2);
            break;
        case '-':
            return subtract(number1, number2);
            break;
        case '*':
            return multiply(number1, number2);
            break;
        case '/':
            if(number2 == '0'){
                return 'Cannot divide by 0';
            }
            return divide(number1, number2);
            break;
        default:
            break;
    }

    return number2;
}

// reset everything to default 
function clear() {
    operator = null;
    displayTextValue = '';
    currentNum = null;
    firstNum = null;
    isFirstInput = false;
    decimalButton.disabled = false;
}
