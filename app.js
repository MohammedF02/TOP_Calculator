window.addEventListener("DOMContentLoaded", (event) => {
    const operatorButton = document.querySelectorAll('[data-operator]');
    const numberButton = document.querySelectorAll('[data-number]');
    const lastOperation = document.getElementById('lastOperation');
    const currentOperation = document.getElementById('currentOperation');
    const equalsButton = document.getElementById('equalsButton');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const dotButton = document.getElementById('dotButton');

    let firstOperation = '';
    let secondOperation = '';
    let currentFunction = null;
    let resetScreen = false;


    equalsButton.addEventListener('click', operation);
    backspaceButton.addEventListener('click', backspace);
    clearButton.addEventListener('click', clear);
    dotButton.addEventListener('click', appendDot);
    window.addEventListener('keydown', keyboardInputHandler);

    operatorButton.forEach((button) =>
        button.addEventListener('click', () => setOperator(button.textContent))
    )
    numberButton.forEach((button) =>
        button.addEventListener('click', () => append(button.textContent))
    )

    function setOperator(operator) {
        if (currentFunction != null) {
            operation();
        }
        firstOperation = currentOperation.textContent;
        currentFunction = operator;
        lastOperation.textContent = `${firstOperation} ${currentFunction}`;
        resetScreen = true;
    }

    function append(number) {
        if (currentOperation.textContent == '0' || resetScreen) {
            cleanScreen();
        }
        currentOperation.textContent += number;
    }

    function operation() {
        if (currentFunction == null || resetScreen) return;
        if (currentFunction == '÷' && currentOperation.textContent == '0') {
            alert("Can't divide by zero.");
            return;
        }
        secondOperation = currentOperation.textContent;
        currentOperation.textContent = roundResult(
            operate(currentFunction, firstOperation, secondOperation)
        );
        lastOperation.textContent = `${firstOperation} ${currentFunction} ${secondOperation} =`;
        currentFunction = null;
    }

    function roundResult(number) {
        return Math.round(number * 1000) / 1000
    }

    function cleanScreen() {
        currentOperation.textContent = '';
        resetScreen = false;
    }

    function clear() {
        currentOperation.textContent = '0';
        lastOperation.textContent = '';
        firstOperation = '';
        secondOperation = '';
        currentFunction = null;
    }

    function backspace() {
        currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
    }

    function appendDot() {
        if (resetScreen) cleanScreen();
        if (currentOperation.textContent == '') currentOperation.textContent = '0';
        if (currentOperation.textContent.includes('.')) return;
        currentOperation.textContent += '.';
    }

    function keyboardInputHandler(input) {
        if (input.key >= 0 && input.key <= 9) append(input.key);
        if (input.key == '=') operation();
        if (input.key == '.') appendDot();
        if (input.key == 'Backspace') backspace();
        if (input.key == 'Escape') clear();
        if (input.key == '+' || input.key == '-' || input.key == '/' || input.key == '*') setOperator(convertOperator(input.key));
    }

    function convertOperator(operator) {
        if (operator == '+') return '+';
        if (operator == '-') return '−';
        if (operator == '*') return '×';
        if (operator == '/') return '÷';
    }

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        return a / b;
    }

    function operate(operator, a, b) {
        a = Number(a);
        b = Number(b);

        if (operator == '+') return add(a, b);
        else if (operator == '−') return subtract(a, b);
        else if (operator == '×') return multiply(a, b);
        else if (operator == '÷') {
            if (b == 0) return null;
            else return divide(a, b);
        }
        else return null;
    }
});