const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
function calculateA(){
    let result = 0;
    for(let i = 0; i < input.length; i++){
        for (let j = 0; j < input[i][1].length;j++){
            let l = input[i][1][j].length;
            if (l == 2 || l == 4 || l == 3 || l == 7)
                result += 1;
        }
    }
    return result;
}

function calculateB(){
    let possibilities = new Map();
    let total = 0;
    for (i = 0; i < input.length; i++){
        let totalSegments = new Map();
        for (j = 0; j < input[i][0].length;j++){
            //console.log(i,j,input[i][0][j]);
            if(input[i][0][j].length == 2)
                possibilities.set(1, input[i][0][j]);
            if(input[i][0][j].length == 3)
                possibilities.set(7, input[i][0][j]);
            if(input[i][0][j].length == 4)
                possibilities.set(4, input[i][0][j]);
            /*Not needed to check
            if(input[i][0][j].length == 7)
                possibilities.set(8, input[i][0][j]);*/
            input[i][0][j].split('').map(x => {
                if (totalSegments.get(x)) 
                    totalSegments.set(x,totalSegments.get(x)+1)
                else
                    totalSegments.set(x,1);
                });
        }
        let mapping = [];
        //Find mapping baased on exclusion method
        for (const [key, value] of totalSegments.entries()){
            if (value == 9)
                mapping[key] = 'f';
            if (value == 6)
                mapping[key] = 'b';
            if (value == 4)
                mapping[key] = 'e';
            if (value == 8){
                if (possibilities.get(1).split('').includes(key) && possibilities.get(7).split('').includes(key))
                    mapping[key] = 'c';
                else
                    mapping[key] = 'a';
            }
            if (value == 7){
                if (possibilities.get(4).split('').includes(key))
                    mapping[key] = 'd';
                else   
                    mapping[key] = 'g';
            }
        }
        //Translate digits according to mapping and find corresponding number
        let result = '';
        for (let j = 0; j < input[i][1].length; j++){
            let digitCode = input[i][1][j].split('').sort().join('');
            let translate = '';
            for (let a = 0; a < digitCode.length; a++){
                translate += mapping[digitCode[a]];
            }
            translate = translate.split('').sort().join('');
            //console.log(input[i][1].length, translate,'acedgfb'.split('').sort().join(''));
            let number = '-1';
            switch (translate){
                case 'abcefg'.split('').sort().join('') : number = '0'; break;
                case 'cf' : number = '1'; break;
                case 'acdeg'.split('').sort().join('') : number = '2'; break;
                case 'acdfg'.split('').sort().join('') : number = '3'; break;
                case 'bcdf'.split('').sort().join('') : number = '4'; break;
                case 'abdfg'.split('').sort().join('') : number = '5'; break;
                case 'abdefg'.split('').sort().join('') : number = '6'; break;
                case 'acf'.split('').sort().join('') : number = '7'; break;
                case 'abcdefg'.split('').sort().join('') : number = '8'; break;
                case 'abcdfg'.split('').sort().join('') : number = '9'; break;
            }
            result += number;
        }
        total += parseInt(result);
    }
    return total;
}

//Problem A
console.log(calculateA());
//Problem B
console.log(calculateB());

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim().split('|').map(x => x.trim().split(' '));
    });
}