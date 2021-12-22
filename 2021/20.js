const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
const algorithm = input[0];
const image = input[1].split('\n');

//console.log({algorithm, image});
//console.log(image[-1]);

function getBinaryValue(x,y,image, onoff){
    let binary = '';
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++) {
            //console.log(y,x,i,j, typeof image[y+i]);
            //console.log(typeof image[y+i] !== "undefined" && typeof image[y+i][x+j] !== "undefined");
            if (typeof image[y+i] !== 'undefined' && typeof image[y+i][x+j] !== 'undefined'){
                //console.log("not undefined", image[y+i][x+j]);
                binary += image[y+i][x+j] == '#' ? 1 : 0;
            }else{
                binary += onoff ? 1 : 0;
            }
        }
    }
    //console.log(binary);
    return parseInt(binary,2);
}

function iterateImage(image, iteration = 1){
    let temp = [];
    for (let y = -1; y <= image.length; y++){
        temp[y+1] = [];
        for (let x = -1; x <= image[0].length; x++){
            //If algorithm[0] is # means that the infinite space of . with 9 . around will turn to #
            //and since algorithm[algorithm.length -1] is a . this will toogle in the real input
            //If algorithm[algorithm.length -1] would be # when algorith[0] is # would be a problem in below
            if (algorithm[0] == '#') 
                temp[y+1] += algorithm[getBinaryValue(x,y,image, iteration%2)];
            else
                temp[y+1] += algorithm[getBinaryValue(x,y,image, 0)];
        }
    }
    //console.log(temp);
    return temp;
}

function getNbrHashes(image){
    let count = 0;
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[y].length; x++) {
            if(image[y][x] == '#')
                count++;
        }
    }
    return count;
}
let t = image;
for (let steps = 0; steps < 50; steps++){
    t = iterateImage(t,steps);
    if (steps == 1)
        console.log("Part 1", getNbrHashes(t)); //  Part 1 Not 5294, 5338, correct : 5326
}
//console.log(t);
console.log("Part2", getNbrHashes(t));

function parseInput(input_string){
    return input_string.split('\n\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}