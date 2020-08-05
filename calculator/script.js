let memory = [];
let ops = '/*-+';
let isCalculated = false;
const allElems = getElems();


function getElems() {

    const elems = {};
    let allChildren = document.querySelector('.container').children;

    for (let child of allChildren) {
        elems[child.classList.value] =  document.querySelector(`.${child.classList.value}`);
    }
    return elems;
}

function limit() {
    if (allElems.result.innerHTML.length >= 24){
        allElems.result.style.fontSize = '1.5em';
    
    }
    if (allElems.result.innerHTML.length >= 31) {
        allElems.result.style.fontSize = '1.1em';
    
    }
    if (allElems.result.innerHTML.length >= 44) {
        allElems.result.innerHTML = allElems.result.innerHTML.slice(0, 44);
        return;
    }
}

function numGenerator(num) {
    return function() {

        
        if (isCalculated && !ops.includes(getLastAdded())) {
            clearIt();
        }
        if (allElems.result.innerHTML === '0') {
            allElems.result.innerHTML = num.innerHTML;
        } 
        else if (allElems.result.innerHTML > '0'){
            allElems.result.innerHTML += num.innerHTML;
            
        }
        if (ops.includes(getLastAdded())) {
            memory.push(allElems.result.innerHTML);
        } 
        else {
            updateLastAdded();
        }
        limit();
    }
}

function addDot() {
    if (!allElems.result.innerHTML.includes('.')) {
        allElems.result.innerHTML += allElems.numDot.innerHTML;
    }
}

function negate() {
    let negative = allElems.numNeg.innerHTML.replace('(-)', '-');

    if (!eval(allElems.result.innerHTML)) {
    }
    else if (!allElems.result.innerHTML[0].includes(negative)) {
        allElems.result.innerHTML = `${negative}${allElems.result.innerHTML}`
        updateLastAdded();
    }
    else if (allElems.result.innerHTML[0].includes(negative)) {
        allElems.result.innerHTML = allElems.result.innerHTML.slice(1);
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
        allElems.result.innerHTML = 0;
    };
}

function total() {

    let char = getLastAdded();

    if (isNaN(+char)) {
        memory.pop();
    }
    if (isNaN(eval(memory.join('')))) {
        allElems.result.innerHTML = '0';
    }
    else if (eval(memory.join('')) === Infinity ||
    eval(memory.join('')) === -Infinity) {
        allElems.result.innerHTML = "Cannot divide by zero".toUpperCase();
        isCalculated = true;
        return;
    }
    else {
        allElems.result.innerHTML = eval(memory.join(''));
    }
    allElems.result.innerHTML = addComma();
    limit();
    isCalculated = true;
}

function clearIt() {
    allElems.result.style.fontSize = '2em';
    allElems.result.innerHTML = 0;
    memory = [];
    isCalculated = false;
    return allElems.result.innerHTML;
}

function backSpace() {
    let result = allElems.result.innerHTML;
    if (result === '0' || result.length === 1) {
        allElems.result.innerHTML = '0';
    }
    else if (result.length === 2 && result[0] === '-') {
        clearIt();
    }
    else {
        allElems.result.innerHTML = result.slice(0, result.length-1);
    }
    if (ops.includes(getLastAdded())) {
    } 
    else {
        updateLastAdded();
    }
    return allElems.result.innerHTML;
}

function updateLastAdded() {
    memory.pop();
    memory.push(allElems.result.innerHTML);
}

function getLastAdded() {
    return memory[memory.length -1];
}

function addComma(){
    return Number(allElems.result.innerHTML).toLocaleString('en-US');
}

// ALL EVENT LISTENERS
allElems.clear.addEventListener('click', clearIt);
allElems.bkSpace.addEventListener('click', backSpace);
allElems.eq.addEventListener('click', total);
allElems.numDot.addEventListener('click', addDot);
allElems.numNeg.addEventListener('click', negate);

// NUMBERS EVENTS
const nums = Object.keys(allElems).filter((el) => !isNaN(Number(el.slice(-1))));
nums.forEach(num => allElems[num].addEventListener('click', numGenerator(allElems[num])));

// OPERATORS EVENTS
const operators = Object.keys(allElems).filter((el) => el.length === 3 );
operators.forEach(el => allElems[el].addEventListener('click', operator(allElems[el])));
