const { log } = require('console');
const {readInFile} = require('../read_input');

const input = parseInput(readInFile());


var acc = 0;
for (i = 0; i< input.length; i++){
    var possible = 1;
    for (j = 0; j < input[i].length; j++){
        var set = input[i][j];
        
        for(x = 0; x < set.length;x++){
            number = /\d+/.exec(set[x]);
            c = set[x].split(' ');
            color = c[c.length-1];
            
            if (color == 'red' && +number > 12)
                possible = 0; 
            if (color == 'green' && +number > 13)
                possible = 0; 
            if (color == 'blue' && +number > 14)
                possible = 0; 
        }
    }
    if (possible)
        acc += i+1;
}
console.log(acc);


function parseInput(input_string){
    return input_string.split('\n').map(x => {
        //return line.trim();
        return x.trim().split(/Game \d+: /)[1].split(';').map(y => y.split(','));
    });
}