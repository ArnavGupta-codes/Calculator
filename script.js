const inputBox=document.getElementById('input');
const expressionDiv=document.getElementById('expression');
const resultDiv=document.getElementById('result');
let result='';
let expression='';
let lastInput = '';

function buttonClick(event){
    const target=event.target;
    const action=target.dataset.action;
    const value=target.dataset.value;

    switch(action){
        case'number':
            addValue(value);
            break;
        case'clear':
            clear();
            break;
        case'backspace':
            backspace();
            break;
        case'addition':
        case'subtraction':
        case'multiplication':
        case'division':
            if(expression === ''&&result !== '')startFromResult(value);
            else if(expression!==''&&!isLastCharOperator())addValue(value);
            break;
        case'equal':
            submit();
            break;
        case'negate':
            negate();
            break;
        case'mod':
            percentage();
            break;
        case'decimal':
            decimal(value);
            break;
    }
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);
document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(event){
    const key = event.key;

    if (!isNaN(key)) {
        addValue(key);
    }
    else if(['+', '-', '*', '/'].includes(key)){
        addOperator(key);
    }
    else if(key === '='){ 
        //Using Enter here was giving a bit errors like sometimes clearing the code(coz it was last clicked) && Issues when using both click and keyboard sometimes
        if (expression !== '') {
            submit();
        }
    }
    else if(key === 'Backspace'){
        backspace();
    }
    else if (key === 'Escape' || key === 'Enter'){
        clear();
    }
    else if (key === '.') {
        decimal('.');
    }
    updateDisplay(expression, result);
}

function addOperator(operator) {
    if (expression === '' && result !== '') {
        startFromResult(operator);
    } else if (expression !== '' && !isLastCharOperator()) {
        addValue(operator);
    }
}

function addValue(value){
    if(value === '.'){
        const lastOperatorIndex=expression.search(/[+\-*/]/);
        const lastDecimalIndex=expression.lastIndexOf('.');
        const lastNumberIndex=Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/')
        );
        if((lastDecimalIndex<lastOperatorIndex||lastDecimalIndex<lastNumberIndex||lastDecimalIndex===-1)&&
           (expression=== ''||expression.slice(lastNumberIndex+1).indexOf('.') === -1)){
            expression += value;
        }
    }
    else{
        expression += value;
    }
}
function updateDisplay(expression, result){
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear(){
    expression='';
    result = '';
}

function backspace(){
    expression=expression.slice(0,-1);
}

function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value){
    expression += result+value;
}

function submit(){
    if(expression === '') 
        return;
    result=evaluateExpression();
    expression = '';
}

function evaluateExpression(){
    const evalResult=eval(expression);
    return isNaN(evalResult)||!isFinite(evalResult)?''
           :evalResult<1?parseFloat(evalResult.toFixed(10))
           :parseFloat(evalResult.toFixed(2));
}

function negate(){
    if(expression === '' && result !== ''){
        result = -result;
    }
    else if(!expression.startsWith('-')&&expression!==''){
        expression = '-'+expression;
    }
    else if(expression.startsWith('-')){
        expression=expression.slice(1);
    }
}

function percentage(){
    if(expression!==''){
        result=evaluateExpression();
        expression='';
        if(!isNaN(result) && isFinite(result)){
            result /= 100;
        }
        else{
            result = '';
        }
    }
    else if(result !== ''){
        result=parseFloat(result)/100;
    }
}



function decimal(value){
    if(!expression.endsWith('.')&&!isNaN(expression.slice(-1))){
        addValue(value);
    }
}