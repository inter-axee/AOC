const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

console.log(input);

function parseInput(input_string){
    return input_string.split(',').map(line => {
        return line.trim();
    });
}