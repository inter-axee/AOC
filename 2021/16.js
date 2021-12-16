const {readInFile} = require('../read_input');
const input = parseInput(readInFile());
//console.log(input);

/**
 * Converting a Hexadecimal string to binary with parseInt and toString functionality
 */
function getBinaryfromHex(hex){
    let binary = '';
    for (let i = 0; i < hex.length; i++){
        let t = parseInt(hex[i],16).toString(2);
        while (t.length != 4)
            t = '0' + t;
        binary += t;    
    }
    return binary;
}

/**
 * Global variables that are updated in recursive function readPackages
 * globalPosition is a pointer used to know where in the binary string to read
 * globalVersionCounter is used for part 1 of the problem to just add all versions of packages
 */
let globalPosition = 0;
let globalVersionCounter = 0;

/**
 * Recursive function that with the same input works with a global position pointer to know where to read
 */
function readPackage(package){
    if (globalPosition > package.length)
        return;
    let version =   package.substring(globalPosition,globalPosition + 3);
    let type =      package.substring(globalPosition + 3,globalPosition + 6);
    globalVersionCounter += parseInt(version,2);
    globalPosition += 6; //Add for version and type 3+3
    if (parseInt(type,2) == 4){ //Literal
        let firstBit;
        let subpack = [];
        do {
            firstBit = package.substring(globalPosition, globalPosition+1);
            subpack.push(binary.substring(globalPosition+1, globalPosition+5));
            globalPosition += 5; //Add for first bit and value 1+4
        }while (firstBit != 0)
        return parseInt(subpack.reduce( (x,y) => x+y),2);
    }else {                        //Operator
        let subpackValues = [];
        let lengthTypeID = package.substring(globalPosition,globalPosition+1);
        if (lengthTypeID == '0'){    //Next: total length in bits 
            let length = parseInt(package.substring(globalPosition+1,globalPosition+16),2);
            globalPosition += 16; // Add for length type ID and length 1 + 15
            while (length > 0){
                let pos = globalPosition;
                let v = readPackage(package);
                subpackValues.push(v);
                length -= (globalPosition - pos);
            }
        }else{                       //Next: number of sub-packets immediately contained
            let nbrSubPackages = parseInt(package.substring(globalPosition+1,globalPosition+12),2);
            globalPosition += 12 // Add for length type ID and number of sub packages 1 + 11
            for (let i = 0; i < nbrSubPackages; i++){
                let v = readPackage(package);
                subpackValues.push(v);
            }
        }
        //console.log("type: ", parseInt(type,2));
        if (parseInt(type,2) == 0)
            return subpackValues.reduce((a,b) => a+b);
        if (parseInt(type,2) == 1)
            return subpackValues.reduce((a,b) => a*b);
        if (parseInt(type,2) == 2)
            return Math.min(...subpackValues);
        if (parseInt(type,2) == 3)
            return Math.max(...subpackValues);
        if (parseInt(type,2) == 5)
            return subpackValues[0] > subpackValues[1] ? 1 : 0;
        if (parseInt(type,2) == 6)
            return subpackValues[0] < subpackValues[1] ? 1 : 0;
        if (parseInt(type,2) == 7)
            return subpackValues[0] == subpackValues[1] ? 1 : 0;
        return;
    }
}
//while (globalPosition <= input.length)
let binary = getBinaryfromHex(input[0]);
//console.log(binary);

let result = readPackage(binary);
console.log(globalVersionCounter);
console.log(result);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
        //return line.trim().split('').map();
    });
}