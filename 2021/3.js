const {readInFile} = require('../read_input');
const input = parseInput(readInFile());
//console.log(input);

function problemA(){
    let textValue;
    
    //Initialize counting array for each position in a binary number
    let countOnes = new Array(input[0].length).fill(0);
    let total = 0;
    for(let i = 0; i < input.length; i++){
        textValue = input[i];
        for (let j = 0; j < textValue.length; j++)
            countOnes[j] += parseInt(textValue[j]);
        total++;
    }
    let result1 = [];
    let result2 = [];
    for (let j = 0; j < countOnes.length; j++){
        if (countOnes[j] > total/2){
            result1.push(1);
            result2.push(0);
        }else{
            result1.push(0);
            result2.push(1);
        }
    }
    return parseInt(result1.join(""),2) * parseInt(result2.join(""),2);
}

/**
 * Given an array(array) with binary numbers count the number of 1's in given position (pos)
 * and return an array with the count and the total of binary numbers
 */
function countInPosition(array, pos){
    let total = 0;
    let count = 0;
    for(let i = 0; i < array.length; i++){
        total++;
        count += parseInt(array[i][pos]);
    }
    return {count, total}
}

/**
 * Given an array (array) with binary numbers check binary number at position if it meets the bit criteria given in the problem
 * validNumber steers if it is bit criteria 1 or 0
 * Return an array with all binary numbers that meets the criteria
 */
function getValidNumbers(array, pos, validNumber){
    let result = [];
    let t = countInPosition(array,pos);
    //console.log(t);
    let moreOnes = t.count > (t.total/2);
    //console.log(moreOnes);
    for(let i = 0; i < array.length;i++){
        let value = array[i];
        if (moreOnes){
            if (parseInt(array[i][pos]) == validNumber)
                result.push(value);
        }else{
            if(t.count == (t.total/2)){
                if (parseInt(array[i][pos]) == validNumber)
                    result.push(value);    
            }else if (parseInt(array[i][pos]) == (validNumber == 1 ? 0 : 1))
                result.push(value);
        }
    }
    return result;
}

//Problem A
console.log(problemA());

//Problem B
let resultArray = input;
//console.log(oldArray);
for (let i = 0; i < input[0].length; i++){
    resultArray = getValidNumbers(resultArray,i, 1);
    if (resultArray.length == 1)
        break;
}
const oxygen = parseInt(resultArray.join(""),2);

resultArray = input;
//console.log(oldArray);
for (let i = 0; i < input[0].length; i++){
    resultArray = getValidNumbers(resultArray,i,0);
    if (resultArray.length == 1)
        break;
}
const CO2 = parseInt(resultArray.join(""),2);

console.log(oxygen*CO2);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}