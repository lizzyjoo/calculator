// Variables to store calculator state
let firstNum = null;
let secondNum = null;
let operator = '';
let displayEquation = '';
let equals = false;
let solution = null;
// Get reference to the display element
const display = document.getElementById('screen');
// Get reference to the keypad container
let keys = document.querySelector('#keypad');

keys.addEventListener('click', (event)=> {
    let target = event.target;
    // Check if the clicked element is a button
    if (!target.matches('button')) {
        return; // Exit if it's not a button
    }

    let value = target.textContent;

    // Add the push effect class
    target.classList.add('button-push');

    // Remove the push effect class after a short delay
    setTimeout(() => {
        target.classList.remove('button-push');
    }, 50);
    
    // update the calculator screen and equation string if the equals sign and delete button have not been pressed 
    if (equals === false && value !== '⌫' && value !== '=') { // prevent multiple equal signs appending 
        display.append(value);   
    }
    
    // store the user's input/equation as a string without the '=' sign
    if (value !== '=' && value !== '⌫') {
        displayEquation += value;
    } else if (value === '⌫') { // remove the most recently pressed character
        deleteChar();
    }
    // Match the operator in the current equation string
    let operatorMatch = displayEquation.match(/[+\-×÷^√]/);

    if (operatorMatch) {
        operator = operatorMatch[0]; // the operator
        let parts = displayEquation.split(operator);
        firstNum = parts[0];
        secondNum = parts[1] || '';
    }

     // Check if the equals button is clicked
    if (target.id === 'equals') {
        equals = true;
        operate(firstNum, secondNum, operator);
    } else if (target.id === 'clear') { // clear
        clearCalculator();
    }
})

// Perform the calculation based on the operator
function operate(firstNum, secondNum, operator) {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    switch (operator) {
        case '+':
            solution = add(firstNum, secondNum);
            break;
        case '-':
            solution = subtract(firstNum, secondNum);
            break;
        case '×':
            solution = multiply(firstNum, secondNum);
            break;
        case '÷':
            solution = divide(firstNum, secondNum);
            break;
        case '^':
            solution = power(firstNum, secondNum);
            break;
        case '√':
            solution = squareRoot(firstNum);
            break;
    }

    // Round the solution to 6 significant digits
    solution = parseFloat(solution.toPrecision(6));

    display.textContent = solution;
    
    // Set firstNum to the solution for continued calculations
    firstNum = solution.toString();
    secondNum = null;
    operator = '';
    displayEquation = firstNum; // Update displayEquation to continue calculations
    equals = false;
    solution = null;
}

// below are math operations available on this calculator

// addition
function add(a, b) {
    return a + b;
}
// subtraction
function subtract(a, b) {
    return a - b;
}
//multiplication
function multiply(a, b) {
    return a * b;
}
//division
function divide(a, b) {
    if (b === 0) {
        return "ZERODIV.ERROR";
    }
    return a / b;
}
// power
function power(a, b) {
    return Math.pow(a, b);
}
function squareRoot(a) {
    return Math.sqrt(a);
}

// delete the last digit/operator
function deleteChar() {
    // Remove the last character from the displayEquation
    displayEquation = displayEquation.slice(0, -1);
    // Update the display text content
    display.textContent = displayEquation;
}

// clear all entries
function clearCalculator() {
    display.textContent = '';
    firstNum = null;
    secondNum = null;
    operator = '';
    displayEquation = '';
    equals = false;
    solution = null;
}