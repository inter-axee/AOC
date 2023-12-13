const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

function stringDiffCount(str1, str2) {
  let count = 0;
  for (let i = 0; i < str1.length && i < str2.length; i++) {
    if (str1[i] !== str2[i]) {
      count++;
    }
  }
  return count;
}

function find(grid) {
  for (let r = 1; r < grid.length; r++) {
    let above = grid.slice(0, r).reverse();
    let below = grid.slice(r);
    above = above.slice(0, below.length);
    below = below.slice(0, above.length);
    //console.log(r, above, below);
    let diffCount = above.reduce(
      (acc, val, idx) => acc + stringDiffCount(val, below[idx]),
      0
    );
    // console.log("diffcount: ", diffCount);
    if (diffCount === 1) {
      return r;
    }
  }
  return 0;
}

function transpose(grid) {
  return grid[0]
    .split("")
    .map((_, colIndex) => grid.map((row) => row[colIndex]));
}

var acc = 0;
for (i = 0; i < input.length; i++) {
  grid = input[i];
  row = find(grid);
  acc += 100 * row;
  col = find(transpose(grid));
  acc += col;
  // console.log("r:", row, "col:", col);
}
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n\r\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split("\r\n")
      .map((y) => y);
  });
}
