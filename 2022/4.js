const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

let checker = (arr, target) => target.every(v => arr.includes(v));

function calculate(problemA){
    let result = 0;
    let result2 = 0;
    input.forEach(e => {
        const arr1 = [];
        const arr2 = [];
        for (let i = e[0][0]; i <= e[0][1]; i++ ){
            arr1.push(i);
        }
        for (let i = e[1][0]; i <= e[1][1]; i++ )
            arr2.push(i);
        
        if(checker(arr1,arr2) || checker(arr2,arr1))
            result += 1;
        
        let found = false;
        arr1.forEach(x => {
            if (arr2.includes(x))
                found = true;
        });
        if (found)
            result2 += 1;
      
    });
    if (problemA)
        return result;
    else    
        return result2;
}

//Problem A
console.log(calculate(true)); // 567
//Problem B
console.log(calculate(false)); // 907

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split(',').map(x=>x.split('-').map(y=>+y));
    });
}