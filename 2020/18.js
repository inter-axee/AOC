'use strict'

const fs = require('fs')
const input = fs.readFileSync('./18.txt', 'utf-8').trim().split('\n');
//console.log(input);

function evaluatePlusFirst(expression){
    expression = expression.replace(/[\(\)]*/g, '');
    while (expression.indexOf('+') != -1){
        let plusExp = expression.match(/[0-9]*\s\+\s[0-9]*/g);
        expression = expression.replace(plusExp[0], eval(plusExp[0]));
    }
    return eval(expression);
}

function evaluateLeftToRight(expression){
    let exArray = expression.replace(/[\(\)]*/g, '').split(' ');
    //console.log("removed para", exArray);
    let temp = parseInt(exArray[0]); 
    for (let i = 1; i < exArray.length; i+=2){
            //console.log("calculating" , temp.toString() + exArray[i] + exArray[i+1]);
            temp = eval(temp.toString() + exArray[i] + exArray[i+1]);
    }
    //console.log(temp);
    return temp.toString();
}

function calculate(expression, problemA){
    while (expression.indexOf('(') != -1){
        let subExpression = expression.match(/\((?![0-9\+\*\s]*\()[0-9\+\*\s]*\)/g);
        for (let i = 0; i < subExpression.length; i++){
            //console.log("replacing", subExpression[i], "in", expression, "result", expression.replace(subExpression, evaluateLeftToRight(subExpression[i])));
            expression = expression.replace(subExpression[i], problemA ? evaluateLeftToRight(subExpression[i]) : evaluatePlusFirst(subExpression[i]));
        }
        //console.log("exp: ", expression);
    }
    return parseInt(problemA ? evaluateLeftToRight(expression) : evaluatePlusFirst(expression));
}

let problemA = true;
let resultA = 0;
let resultB = 0;
for (let i = 0; i < input.length; i++){
    const exp = input[i];
    let temp1 = calculate(exp, problemA);
    let temp2 = calculate(exp, !problemA);
    //console.log(temp);
    resultA += temp1;
    resultB += temp2;
}
console.log(resultA);
console.log(resultB);