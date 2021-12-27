/**
 * TODO: needs refactoring
 */
const {readInFile} = require('../read_input');
const input = parseInput(readInFile());

function getPreviousNumberAndIndex(str, index){
    for (let i = index; i >= 0; i--){
        if (/\d/.test(str[i])){
            //console.log("found number", str[i]);
            return [i, parseInt(str[i])];
        }
    }
    return -1;
}
function getNextNumberAndIndex(str, index){
    for (let i = index; i < str.length; i++){
        if (/\d/.test(str[i])){
            //console.log("found number", str[i]);
            return [i, parseInt(str[i])];
        }
    }
    return -1;
}

function reduce(exp){
    let depth = 0;
    let explode = true;
    let split = true;
    let explodeIndex,splitIndex;
    let expression = new Array(exp.length);
    for (let i = 0; i < exp.length; i++)
        expression[i] = exp[i];
    
    while (explode || split){
        explode = false;
        split = false;
        depth = 0;
        //console.log("New iteration", expression.join(''));
        for (let i = 0; i < expression.length; i++){
            //console.log("Cehcking", expression[i]);
            if (expression[i] == '[')
                depth++;
            else if (expression[i] == ']')
                depth--;
            else if (depth == 5 && /\d/.test(expression[i])){
                //console.log("Something to explode at depth ",depth, "iteration ", i);
                //console.log("touple to explode [", expression[i], ",",expression[i+2],"]");
                explode = true;
                explodeIndex = i;
                break;
            //If split is found store first but can't break if there is an explosion needed later.
            }else if (/\d{2}/.test(expression[i]) && !split){ 
                split = true;
                splitIndex = i;
            }
        }
        if (explode){
            //console.log("exploding at", explodeIndex);                
            let firstNumber = parseInt(expression[explodeIndex]);
            let secondNumber = parseInt(expression[explodeIndex+2]);
            let a = getPreviousNumberAndIndex(expression, explodeIndex-1)
            let b = getNextNumberAndIndex(expression, explodeIndex+3)
            
            if (a != -1)
                expression[a[0]] = (firstNumber + a[1]).toString();
            //console.log("Between", expression);
            if (b != -1)
               expression[b[0]] = (secondNumber + b[1]).toString();
        
            expression.splice(explodeIndex-1,5,'0');
            //console.log("After replacing tuple",expression);
        }else if (split){
            //console.log("splitting at", splitIndex);
            let splitValue = parseInt(expression[splitIndex]);
            let a = Math.floor(splitValue/2);
            let b = Math.ceil(splitValue/2);
            expression.splice(splitIndex,1, '[', a.toString(), ',', b.toString(), ']');
            //console.log("After splitting", expression.join(''));
        }
        //console.log("Iteration Done", expression.join(''));
    }
    return expression;
}

function getMagnitude(array){
    let a = array[0];
    let b = array[1];

    if (typeof a == 'number')
        if (typeof b == 'number')
            return 3*a + 2*b;
        else
            return 3 * a + 2 * getMagnitude(b);
    else if (typeof b == 'number')
        return 3 * getMagnitude(a) + 2 * b;
    else
        return 3 * getMagnitude(a) + 2 * getMagnitude(b);
}

let sum = JSON.parse(input[0]);
for (let i = 1; i < input.length; i++){
    //console.log("SUM", sum);
    let a = [sum, JSON.parse(input[i])];
    //console.log("a", a);
    sum = JSON.parse(reduce(JSON.stringify(a)).join(''));
}
console.log(JSON.stringify(sum));
console.log(getMagnitude(sum));

let max = -1;
for (let i = 0; i < input.length; i++){
    let first = JSON.parse(input[i]);
    for (let j = 0; j < input.length; j++){
        if (i==j) continue;
        let second = JSON.parse(input[j]);
        let t = [first, second];
        let mag = getMagnitude(JSON.parse(reduce(JSON.stringify(t)).join('')))
        if (mag > max)
            max = mag;
    }
}
console.log("Max: ", max);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}