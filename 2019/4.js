const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

function calculate(problemA, min, max){
    let result = 0;
    for(let i = min; i <= max; i++){   
        let length = true, dubbledigit = false, increasing = true;
        //Length check
        if (i.toString().length != 6)
            length = false;
        //dubble digit and increasing check
        let textValue = i.toString();
        let first = parseInt(textValue[0]);
        d = [];
        for (let j = 1; j < i.toString().length; j++){
            if (first > parseInt(textValue[j]))
                increasing = false;        
            if (first == parseInt(textValue[j]))
                dubbledigit = true;
            first = parseInt(textValue[j]);
        }
        //console.log(textValue, length,dubbledigit,increasing);
        if (length && dubbledigit && increasing){
            if (problemA){
                result++;
            }else{
                //Part 2. Verify that the number has exactly 2 numbers of the same value
                const a = [...textValue];
                const c = {};
                a.map((x) => c[x] = (c[x] || 0 )+1);
                if (Object.entries(c).find(x => x[1] == 2))
                    result++;
            }
        }
    }
    return result;
}

//Problem A
min = parseInt(input[0]);
max = parseInt(input[1]);
console.log(calculate(true, min, max));
//Problem B
console.log(calculate(false, min, max));

function parseInput(input_string){
    return input_string.split('-').map(line => {
        return parseFloat(line.trim());
    });
}