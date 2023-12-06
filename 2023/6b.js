const { log, time } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

const t = parseInt(
  input[0][1]
    .split(" ")
    .map((x) => +x)
    .filter((y) => {
      if (!isNaN(y)) return y;
    })
    .join("")
);

const record = parseInt(
  input[1][1]
    .split(" ")
    .map((x) => +x)
    .filter((y) => {
      if (!isNaN(y)) return y;
    })
    .join("")
);
console.log(t, record);

//Andragradsekvation

let root = Math.sqrt(t * t - 4.0 * record);
let upper = (t + root) / 2.0;
let lower = (t - root) / 2.0;

//Could potentially be a rounding issue
console.log(parseInt(upper - lower));

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split(":")
      .map((y) => y.trim());
  });
}
