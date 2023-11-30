/**
 * This solution solves also the first part if knots array is altered to 2 knots.
 */

const { readInFile } = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
const print = (string) => console.log(string);
const abs = (a) => Math.abs(a);

//Solved with Marting and Johan

function parseInput(input_string) {
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim();
    });
}