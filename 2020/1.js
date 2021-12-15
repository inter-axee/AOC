'use strict'

const exp = require('constants');
const fs = require('fs')
const input = fs.readFileSync('./1.txt', 'utf-8').trim().split('\n').map(x=>+x);

let a = 0; let b = 0;
input.forEach(x => {
    input.forEach(y => {
        if (x+y === 2020) a = x*y;
        input.forEach(z => {
            if (x+y+z === 2020) b = x*y*z;
        })
    })
})
console.log(a);
console.log(b);