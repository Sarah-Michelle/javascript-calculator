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

let add = (number1, number2) => number1 + number2;
let subtract = (number1, number2) => number1 - number2;
let multiply = (number1, number2) => number1 * number2;
let divide = (number1, number2) => number1 / number2;

document.addEventListener('keypress', (button) => {
    // let buttonName = button.key;

    // if(isFinite(buttonName)){
    //     console.log(buttonName);
    //     inputDigit(buttonName);
    // }

    let value = button.key;

    if (!button.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
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
    } else {
        if (num === '0' && displayTextValue === '') { 
            displayTextValue = num;
        }
        else {
            displayTextValue += num.toString();
        }
    }
}

function inputDecimal() {
    if (isFirstInput === true) {
        displayTextValue = '0.';
        isFirstInput = false;
        decimalButton.disabled = true;
        return;
    } 

    if(!displayTextValue.includes('.')){
        decimalButton.disabled = false;
        displayTextValue += '.';
    }
    else{
        decimalButton.disabled = true;
    }
    
}

function updateDisplay() {
    displayValueContainer.innerText = displayTextValue;
}

function deleteNum() {
    displayTextValue = displayTextValue.slice(0, -1);
    currentNum = displayTextValue;
    displayValueContainer.innerText = displayTextValue;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayTextValue);

    //overwrite previous operator if 2 operators were inputted consecutively
    if (operator && isFirstInput) {
        operator = nextOperator;
        console.log(operator);
        return;
    }

    // verify that 'firstNum' is null and that the `inputValue`
    // is not a `NaN` value
    if (firstNum == null && !isNaN(inputValue)) {
        firstNum = inputValue;
    } else if (operator || nextOperator === '=') {
        const result = operate(operator, firstNum, inputValue);

        if(nextOperator === '/'){
            displayTextValue = 'Cannot divide by 0';
        }
        //rounds long decimal numbers 
        // if(!Number.isInteger(result)){
        //     if(operator == '/'){
        //         displayTextValue = 'Cannot divide by 0';
        //     }else{
        //         displayTextValue = (result.toFixed(7)).toString();
        //     } 
        // }

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
            if (number2 === 0) {
                return 'Cannot divide by 0';
            }
            else {
                return divide(number1, number2);
            }
            break;
        default:
            break;
    }

    return number2;
}

function clear() {
    operator = null;
    displayTextValue = '';
    currentNum = null;
    firstNum = null;
    isSecondInput = false;
}







