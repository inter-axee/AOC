const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

function calculateRoute(r){
    let route = r.split(',');
    var map = new Map();
    let x = 0,y =0, d = 0;
    for(let i = 0; i < route.length; i++){
        let [dir, amount] = /(\w)(\d+)/.exec(route[i]).slice(1);
        for (j = 0; j < amount; j++){
            switch(dir){
                case 'U' : map.set(`${x},${y++}`, d); break;
                case 'D' : map.set(`${x},${y--}`, d); break;
                case 'R' : map.set(`${x++},${y}`, d); break;
                case 'L' : map.set(`${x--},${y}`, d); break; 
            }
            d++;
        }
    }
    return map;
    //console.log(result);
}

//Problem A
/**
 * Solved 1st part with array but rewrote with map after second part which also is
 * alot faster to do the intersection of the wires different coordinates.
 */
wire1 = calculateRoute(input[0]);
wire2 = calculateRoute(input[1]);

intersection = [];
wire1.forEach((value, key) => {
    if (wire2.has(key)) 
        intersection.push(key);
});

//console.log(intersection);
let min = 100000000;
intersection.forEach(x => {      
    if (x != '0,0') {
        let d = Math.abs(parseInt(x.split(',')[0])) + Math.abs(parseInt(x.split(',')[1]));
        if (d < min)
            min = d
    }
})

console.log(min);

//Problem B
min = 100000000
intersection.forEach(x => {
    if (x != '0,0') {
        let d = wire1.get(x) + wire2.get(x);
        if (d < min)
            min = d;
    }
})
console.log(min);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}