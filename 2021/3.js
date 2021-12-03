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

function countInPosition(array, pos){
    let total = 0;
    let count = 0;
    for(let i = 0; i < array.length; i++){
        total++;
        count += parseInt(array[i][pos]);
    }
    return {count, total}
}

function getValidNumbers(array, pos, validNumber){
    let result = [];
    let t = countInPosition(array,pos);
    //console.log(t);
    let moreOnes = t.count > (t.total/2);
    //console.log(moreOnes);
    for(let i = 0; i < array.length;i++){
        let value = array[i];
        //console.log(parseInt(array[i][0]));
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
let oldArray = input.slice();
//console.log(oldArray);
for (let i = 0; i < input[0].length; i++){
    let newArray = getValidNumbers(oldArray,i, 1);
    oldArray = newArray.slice();
    //console.log(oldArray);
}

//console.log(parseInt(oldArray.join(""),2));
a = parseInt(oldArray.join(""),2);

oldArray = input.slice();
//console.log(oldArray);
for (let i = 0; i < input[0].length; i++){
    let newArray = getValidNumbers(oldArray,i,0);
    oldArray = newArray.slice();
    if (oldArray.length == 1)
        break;
    //console.log(oldArray);
}
//console.log(parseInt(oldArray.join(""),2));
b = parseInt(oldArray.join(""),2);

console.log(a*b);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}