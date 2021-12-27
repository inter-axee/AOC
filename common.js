'use strict'
const colors = require('colors');

/*
 * Create a new instance of an array and create a frame
 * around it with the value from frame
 */
const createMatrixFrame = (matrix, frame) => {
    let newArray = matrix.map(function(arr) {
        return arr.slice();
    });
    for (let i = 0; i < newArray.length; i++){
        newArray[i].push(frame);
        newArray[i].unshift(frame);
    }
    newArray.unshift( new Array(newArray[0].length).fill(frame) );
    newArray.push( new Array(newArray[0].length).fill(frame) );
    return newArray;
}

/**
 * Debug function
 * Print a matrix with integers and highlight 2 different numbers 
 */
const printMatrix = (matrix, highlight1, highlight2) => {
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[i].length; j++){
            //if (matrix[i][j]){
                if (matrix[i][j] == highlight1)
                    process.stdout.write(matrix[i][j].toString().blue);
                else if (matrix[i][j] == highlight2)
                process.stdout.write(matrix[i][j].toString().red);
                else
                    process.stdout.write(matrix[i][j].toString());
            //}else
              //  process.stdout.write('0');
        }
        process.stdout.write('\n');
    }
}

/**
 * Returns array with all prime factors that number consists of.
 * 
 */
const primeFactors = (number) => {
    var factors = [],
        divisor = 2;
    while(number > 2) {
        if(number % divisor == 0) {
            factors.push(divisor);
            number = number/divisor;
        } else{
            divisor++;
        }
    }
    return factors;
}

const isPrime = (num) => {
    for(let i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
}

/*
 * Uses Sieve of Eratosthenes algoritm to calculate all prime number up to n.
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 */
const generatePrime = (n) => {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];
    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }
    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }
    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }
    return output;
}

module.exports = {
    primeFactors,
    isPrime,
    generatePrime,
    printMatrix,
    createMatrixFrame
}