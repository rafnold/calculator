let memory = [];
let ops = '/*-+';
let isCalculated = false;

// NUMBERS
let num1 = document.querySelector('.num1');
let num2 = document.querySelector('.num2');
let num3 = document.querySelector('.num3'); 
let num4 = document.querySelector('.num4');
let num5 = document.querySelector('.num5');
let num6 = document.querySelector('.num6');
let num7 = document.querySelector('.num7');
let num8 = document.querySelector('.num8');
let num9 = document.querySelector('.num9');
let num0 = document.querySelector('.num0');

// OPERATORS
let dot = document.querySelector('.numDot');
let neg = document.querySelector('.numNeg');
let eq = document.querySelector('.eq');
let div = document.querySelector('.div');
let mul = document.querySelector('.mul');
let sub = document.querySelector('.sub');
let add = document.querySelector('.add');

// DISPLAY-CLR-BKSPACE
let display = document.querySelector('.result');
let bkSpace = document.querySelector('.bkSpace');
let clear = document.querySelector('.clear');

// EVENTS
clear.addEventListener('click', clearIt);
bkSpace.addEventListener('click', backSpace);
num1.addEventListener('click', numGenerator(num1)); 
num2.addEventListener('click', numGenerator(num2));
num3.addEventListener('click', numGenerator(num3));
num4.addEventListener('click', numGenerator(num4));
num5.addEventListener('click', numGenerator(num5));
num6.addEventListener('click', numGenerator(num6));
num7.addEventListener('click', numGenerator(num7));
num8.addEventListener('click', numGenerator(num8));
num9.addEventListener('click', numGenerator(num9));
num0.addEventListener('click', numGenerator(num0));
add.addEventListener('click', operator(add));
sub.addEventListener('click', operator(sub));
mul.addEventListener('click', operator(mul));
div.addEventListener('click', operator(div));
eq.addEventListener('click', total);
dot.addEventListener('click', addDot);
neg.addEventListener('click', negate);


function limit() {
    if (display.innerHTML.length >= 24){
        display.style.fontSize = '1.5em';
    
    }
    if (display.innerHTML.length >= 31) {
        display.style.fontSize = '1.1em';
    
    }
    if (display.innerHTML.length >= 44) {
        display.innerHTML = display.innerHTML.slice(0, 44);
        return;
    }
}

function numGenerator(num) {
    return function() {
        if (isCalculated && !ops.includes(getLastAdded())) {
            clearIt();
        }
        if (display.innerHTML === '0') {
            display.innerHTML = num.innerHTML;
        } 
        else if (display.innerHTML > '0'){
            display.innerHTML += num.innerHTML;
            
        }
        if (ops.includes(getLastAdded())) {
            memory.push(display.innerHTML);
        } 
        else {
            updateLastAdded();
        }
        limit();
    }
}

function addDot() {
    if (!display.innerHTML.includes('.')) {
        display.innerHTML += dot.innerHTML;
    }
}

function negate() {
    
    let negative = neg.innerHTML.replace('(-)', '-');

    if (!eval(display.innerHTML)) {
    }
    else if (!display.innerHTML[0].includes(negative)) {
        display.innerHTML = `${negative}${display.innerHTML}`
        updateLastAdded();
    }
    else if (display.innerHTML[0].includes(negative)) {
        display.innerHTML = display.innerHTML.slice(1);
        updateLastAdded();
    }

}

function operator(op){
    return function() {

        let char = getLastAdded();
        
        if(isCalculated){
            isCalculated = false;
        }
        if (!memory.length) {
        }
        else if (!isNaN(+char)) {
            memory.push(op.innerHTML);
        }
        else if (ops.includes(char)) {
            memory.pop()
            memory.push(op.innerHTML);
        }
        display.innerHTML = 0;
    };
}

function total() {

    let char = getLastAdded();

    if (isNaN(+char)) {
        memory.pop();
    }
    if (isNaN(eval(memory.join('')))) {
        display.innerHTML = '0';
    }
    else if (eval(memory.join('')) === Infinity ||
    eval(memory.join('')) === -Infinity) {
        display.innerHTML = "Cannot divide by zero".toUpperCase();
    }
    else {
        display.innerHTML = eval(memory.join(''));
    }
    display.innerHTML = addComma();
    limit();
    isCalculated = true;
}

function clearIt() {
    display.style.fontSize = '2em';
    display.innerHTML = 0;
    memory = [];
    isCalculated = false;
    return display.innerHTML;
}

function backSpace() {
    
    let result = display.innerHTML;
    
    if (result === '0' || result.length === 1) {
        display.innerHTML = '0';
    }
    else if (result.length === 2 && result[0] === '-') {
        clearIt();
    }
    else {
        display.innerHTML = result.slice(0, result.length-1);
    }
    if (ops.includes(getLastAdded())) {
    } 
    else {
        updateLastAdded();
    }
    return display.innerHTML;
}

function updateLastAdded() {
    memory.pop();
    memory.push(display.innerHTML);
}

function getLastAdded() {
    return memory[memory.length -1];
}

function addComma(){
    return Number(display.innerHTML).toLocaleString('en-US');
}
