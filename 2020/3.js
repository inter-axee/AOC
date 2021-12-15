'use strict'
const fs = require('fs')
const {printMatrix} = require('../common');
const input = fs.readFileSync('./3.txt', 'utf-8').trim().split('\n').map(x=>x.split(''));
//printMatrix(input, '#');

function getTrees(map, i, j){
    let trees = 0;
    let x_pos = 0;
    let y_pos = 0;
    for (let y = 0; y < map.length; y++)
        for (let x = 0; x < map[y].length; x++){
            if (map[y_pos][x_pos] === '#')
                trees++;
            x_pos += i;
            y_pos += j;
            if (x_pos > map[y].length-1){
                x_pos = x_pos % map[y].length;
            }
            if (y_pos >= map.length){
                return trees;
            }
        }
    return trees;
}

console.log(getTrees(input,3,1));

let movement = [[1,1],[3,1],[5,1],[7,1],[1,2]];
let sum = 1;
movement.forEach(x => {
    sum *= getTrees(input, x[0], x[1]);
});
console.log(sum);