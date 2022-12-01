const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

function calculate_version2(){
    let calories = input.map(e => {
        return e.reduce((a,b)=> a+b);
    });
    calories.sort((a,b) => b-a);    
    return calories;
}

const arr = calculate_version2();

console.log(arr[0]);
console.log(arr[0]+arr[1]+arr[2]);

/*function calculate(){
    let max = 0;
    let max2 = 0;
    let max3 = 0;
    input.forEach(e => {
        let p = e.reduce((a,b)=> a+b);
        if (p > max)
            max = p
    });
    input.forEach(e => {
        let p = e.reduce((a,b)=> a+b);
        if (p > max2 && p!= max)
            max2 = p
    });
    input.forEach(e => {
        let p = e.reduce((a,b)=> a+b);
        if (p > max3 & p != max && p != max2)
            max3 = p
    });
    
    return [max,max2,max3];
}
*/
//Problem A
//console.log(calculate()[0]);
//Problem B
//console.log(calculate().reduce((a,b)=>a+b));

function parseInput(input_string){
    return input_string.split('\n\r\n').map(line => {
        //return line.trim();
        return line.trim().split('\n').map(x=>+x);
    });
}