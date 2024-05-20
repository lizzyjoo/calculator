let firstNum = null;
let secondNum = null;
let operator = '';
let displayEquation = '';
let equals = false;
let solution = null;

const display = document.getElementById('screen');
let keys = document.querySelector('#keypad');

keys.addEventListener('click', (event)=> {
    let target = event.target;
    let value = target.textContent;
    
    // update the calculator screen
    if (equals === false && value !== '⌫') { // prevent multiple equal signs appending 
        display.append(value);
    }
    
    // store the user's input/equation as a string without the '=' sign
    if (value !== '=' && value !== '⌫') {
        displayEquation += value;
    }

    let operatorMatch = displayEquation.match(/[+\-X/÷^]/);

    if (operatorMatch) {
        operator = operatorMatch[0]; // the operator
        let parts = displayEquation.split(operator);
        firstNum = parts[0];
        secondNum = parts[1] || '';
    }

    // 1. equals sign is clicked
    if (target.id === 'equals') {
        equals = true;
        operate(firstNum, secondNum, operator);
    }
    else if (target.id === 'clear') {
        display.textContent = '';
        firstNum = null;
        secondNum = null;
        operator = '';
        displayEquation = '';
        equals = false;
        solution = null;
    }
    else if (target.id = 'delete') { // remove the most recently pressed character
        let lastChar = display.textContent.slice(-1);
        // first remove the last character from the display
        

    }
})

function operate(firstNum, secondNum, operator) {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
    // 1. plus operator
    if (operator === '+') {
        solution = add(firstNum,secondNum);
    } 
    // 2. minus operator
    else if (operator === '-') {
        solution = subtract(firstNum,secondNum);
    }
    // 3. multiply operator
    else if (operator === 'X') {
        solution = multiply(firstNum,secondNum);

    } 
    // 4. divide operator
    else if (operator === '÷') {
        solution = divide(firstNum,secondNum);

    }
    // 5. power operator
    else if (operator === '^') {
        solution = power(firstNum,secondNum);
    }
  
    display.textContent = solution;
    firstNum = solution;
    secondNum = null;
    operator = '';
    displayEquation = '';
    equals = false;
    solution = null;
}

// below are math operations available on this calculator
function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b) {
    if (b === 0) {
        return "ZERODIV.ERROR";
    }
    return a/b;
}
function power(a,b) {
    return Math.pow(a, b);
}

function removeChar(str, charToRemove) {
    return str.split('').filter(char => char !== charToRemove).join('');
  }
