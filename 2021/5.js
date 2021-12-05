const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

let vectors = [];
for (let i = 0; i < input.length;i++)
    vectors[i] = input[i].split('->').map(y=>y.split(',').map(x=>+x));

const getDirection = (a, b) => a == b ? 0 : (a < b ?  1 : -1); 

function calculate(problemA){
    let map = new Map();
    for (let i = 0; i < vectors.length;i++){
        let point1 = vectors[i][0];
        let point2 = vectors[i][1];
        let dx = getDirection(point1[0],point2[0]);
        let dy = getDirection(point1[1],point2[1]);
        while (true){
            //only consider straight lines in problem A
            if (problemA && (point1[0] != point2[0] && point1[1] != point2[1]))
                break;

            if (map.has(point1.join()))
                map.set(point1.join(), map.get(point1.join())+1);
            else
                map.set(point1.join(), 1);

            if (point1.join() == point2.join())
                break;

            point1 = [point1[0]+dx, point1[1]+dy];
        }
    }
    let count = 0;
    for (let i of map.values()){
     if (i >= 2)
        count++;
    }
    return count;
}

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}