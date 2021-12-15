'use strict'

const fs = require('fs')
const input = fs.readFileSync('./2.txt', 'utf-8').trim().split('\n');

let total1 = 0;
let total2 = 0;
input.forEach(line => {
    let [original, a, b, criteria, password] = line.match(/([0-9]*)-([0-9]*)\s(.):\s([a-zA-Z]*)/);
    let counter = 0;
    password.split('').forEach(i => {
        if (i === criteria)
            counter++;
    })
    let min = parseInt(a), max = parseInt(b);
    if (min > max){let t = min; min = max; max = t;} 
    if (counter >= min && counter <= max)
        total1++;
    min--; max--; //No zeros
    if ((password[min] === criteria && password[max] !== criteria) 
        || (password[min] !== criteria && password[max] === criteria))
        total2++;
})
console.log(total1);
console.log(total2);
