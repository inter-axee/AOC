const { log } = require('console');
const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
var out = [];
for(i = 0; i < input.length; i++){
    var l = input[i].replaceAll('one', 'one1one');
    l = l.replaceAll('two', 'two2two');
    l = l.replaceAll('three', 'three3three');
    l = l.replaceAll('four', 'four4four');
    l = l.replaceAll('five', 'five5five');
    l = l.replaceAll('six', 'six6six');
    l = l.replaceAll('seven', 'seven7seven');
    l = l.replaceAll('eight', 'eight8eight');
    l = l.replaceAll('nine', 'nine9nine');
    //console.log(input[i], l);
    out.push(l);
}
//console.log(out);

var yy = out.map(x => x.split('').filter( y =>  !isNaN(y)));

var acc = 0;
for (i = 0; i< yy.length; i++){
    var first = +yy[i][0];
    var second = +yy[i][yy[i].length-1]
    acc += first*10 + second;
}
console.log(acc);

function parseInput(input_string){
    return input_string.split('\n').map(x => {
        //return line.trim();
        return x.trim();
    });
}