// Select elements
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
let result = ' ';
let expression = '';

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    if (!action) return;

    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;

        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression === ' '&& result !== ' '){
                startFromResult(value);
            }
            else if(expression !== ' ' && !isLastCharOperator()){
                addValue(value);
            }
        case 'submit':
            Submit();
            break;
    }

    updateDisplay();
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    expression += value;
}

function updateDisplay() {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    updateDisplay();
}

function backspace(){
    expression = expression.slice(0,-1);
}

function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)));
}

function submit(){
    result = evaluateExpression();
    expression = ' ';
}

function evaluateExpression(){
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult)? ' '
    :evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));

}