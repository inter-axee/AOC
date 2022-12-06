const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function calculate(pre){
    let hash = new Array();
    let it = 0;
    let result = [];
    input[0].forEach((e,index) => {
        //console.log("Index "+index+" Element: " + e);
        hash.push(e);
        it++;
        if (it > pre){
            if (!hasDuplicates(hash)){
              //  console.log("found at" + index);
                result.push(index+1);
            }else{
                hash.shift();
            }
        }        
        
        
    }); 
        
    return result[0];
}

//Problem A
console.log(calculate(3));
//Problem B
console.log(calculate(13));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('');
    });
}