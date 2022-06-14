const numberButtons = document.querySelectorAll('#number-button');
const operatorButtons = document.querySelectorAll('#operator-button');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const equalsButton = document.querySelector('#equal-button');
const displayValue = document.querySelector('.display-value');

let operand = '';
let displayTextValue = '';
let currentNum = '';
let prevNum = '';
let isSecondInput = false;

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    let value;
    switch (operator) {
        case '+':
            value = add(parseFloat(number1), parseFloat(number2));
            break;
        case '-':
            value = subtract(parseFloat(number1), parseFloat(number2));
            break;
        case '*':
            value = multiply(parseFloat(number1), parseFloat(number2));
            break;
        case '/':
            value = divide(parseFloat(number1), parseFloat(number2));
            break;
        default:
            value = 0;
            break;
    }

    displayTextValue = value;
    displayValue.innerText = displayTextValue;
    currentNum = value;
}

function buttonFunctionality() {
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            appendToNumber(button.innerText);
            updateDisplay();
        });
    });

    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // if(currentNum == 0){
            //     operand
            // }
            if (!isSecondInput) {
                prevNum = parseFloat(currentNum);
                operand = button.innerText;
                currentNum = '';
                isSecondInput = true;
            }
            else {
                isSecondInput = false;
                operand = button.innerText;
                operate(operand, prevNum, currentNum);
                return;
            }
        });
    });

    clearButton.addEventListener('click', button => {
        clear();
    });

    equalsButton.addEventListener('click', button => {
        console.log(prevNum);
        console.log(currentNum);
        operate(operand, prevNum, currentNum);
    });

    deleteButton.addEventListener('click', button => {
        deleteNum();
    });
}

function clear() {
    prevNum = 0;
    currentNum = 0;
    operand = '';
    displayTextValue = '';
    isSecondInput = false;
    updateDisplay();
}

function deleteNum() {
    displayTextValue = displayTextValue.slice(0, -1);
    currentNum = displayTextValue;
    displayValue.innerText = displayTextValue;
}

function appendToNumber(num) {
    currentNum += num.toString();
}

function updateDisplay() {
    if (currentNum == '') {
        displayTextValue = 0;
    } else {
        displayTextValue = currentNum;
    }

    displayValue.innerText = displayTextValue;
}

buttonFunctionality();
