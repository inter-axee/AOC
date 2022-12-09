const fs = require('fs')
const input = fs.readFileSync('./3.txt', 'utf-8').trim().split('\n').map(x=>x.trim());

const print = (str) => console.log(str);
//print(input[0].length);
function traverseTree(y, x, down, right){  
    if (y >= input.length)
        return 0;
    if (x >= input[y].length)
        x = x - input[y].length;
    if (input[y][x] == '#')
        return 1 + traverseTree(y+down, x+right, down, right);
    else 
        return 0 + traverseTree(y+down, x+right, down, right)
}

print(traverseTree(0,0,1,3));

print(traverseTree(0,0,1,1)*traverseTree(0,0,1,3)*traverseTree(0,0,1,5)*traverseTree(0,0,1,7)*traverseTree(0,0,2,1))