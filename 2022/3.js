const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

function calculate(problemA){
    let result = 0;
    input.forEach((a2) => {
        let length = a2.length
        let a1 = a2.splice(0,length/2);
        
        const filteredArray = a1.filter(value => a2.includes(value));
        
        unique = [...new Set(filteredArray)];
        unique.forEach(x => {
            if (x.toUpperCase() == x)
                result += x.charCodeAt(0)-38;
            else
                result += x.charCodeAt(0)-96;
        })        
    })
    return result;
}

function calculate2(new_input){
    result = 0;
    for (let i = 0; i < new_input.length; i+=3){
        const tempArray = new_input[i].filter(value => new_input[i+1].includes(value));
        const filteredArray = tempArray.filter(value => new_input[i+2].includes(value));
        
        unique = [...new Set(filteredArray)];
        unique.forEach(x => {
            if (x.toUpperCase() == x)
                result += x.charCodeAt(0)-38;
            else
                result += x.charCodeAt(0)-96;
        })
    }
    return result;
}

//const savedInput = structuredClone(input); //Only works on newer JS

//Clone the input array
const savedInput = [];
input.forEach(x =>{
    const t = [];
    x.forEach(y => t.push(y));
    savedInput.push(t)
});

//Problem A
console.log(calculate());
//Problem B
console.log(calculate2(savedInput));
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(x=>x.trim().split(''));
}