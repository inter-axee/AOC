const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

function calculate(problemA){
    let result = 0;
    input.forEach((a2) => {
        let length = a2.length
        let a1 = a2.splice(0,length/2);
        //console.log(length + ' ' + a1 + '  2:'+  a2 );
        const filteredArray = a1.filter(value => a2.includes(value));
        //console.log(filteredArray);
        unique = [...new Set(filteredArray)];
        //console.log(unique);
        unique.forEach(x => {
            if (x.toUpperCase() == x){
                //console.log(x.charCodeAt(0)-38);
                result += x.charCodeAt(0)-38;
            }
            else{
                //console.log(x.charCodeAt(0)-96);
                result += x.charCodeAt(0)-96;
            }
        })
        
    })
    return result;
}

//{}
function calculate2(new_input){
    result = 0;
    for (let i = 0; i < new_input.length; i+=3){
        const tempArray = new_input[i].filter(value => new_input[i+1].includes(value));
        const filteredArray = tempArray.filter(value => new_input[i+2].includes(value));
        //console.log(filteredArray);
        unique = [...new Set(filteredArray)];
        unique.forEach(x => {
            if (x.toUpperCase() == x){
                //console.log(x.charCodeAt(0)-38);
                result += x.charCodeAt(0)-38;
            }
            else{
                //console.log(x.charCodeAt(0)-96);
                result += x.charCodeAt(0)-96;
            }
        })
    }
    return result;
}

const savedInput = structuredClone(input);
//Problem A
console.log(calculate());
//Problem B
console.log(calculate2(savedInput));
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(x=>x.split(''));
}