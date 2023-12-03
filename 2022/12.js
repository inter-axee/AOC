//BFS

const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

var acc = 0;
var sr, sc, er, ec;

for ([r, row] of input.entries()) {
  //console.log(r, row);
  for ([c, item] of row.entries()) {
    //console.log(c, item);
    if (item == "S") {
      sr = r;
      sc = c;
      input[r][c] = "a";
    }
    if (item == "E") {
      er = r;
      ec = c;
      input[r][c] = "z";
    }
  }
}
console.log("S", sr, sc, "E", er, ec);

var q = [];
q.push([0, sr, sc]);
var visited = [];
visited = new Set();
visited.add(`${sr}:${sc}`);

while (q.length) {
  temp = q.shift();
  d = temp[0];
  r = temp[1];
  c = temp[2];
  //console.log("d", d, r, c, q);
  for ([nr, nc] of [
    [r + 1, c],
    [r - 1, c],
    [r, c + 1],
    [r, c - 1],
  ]) {
    if (nr < 0 || nc < 0 || nr >= input.length || nc >= input[0].length)
      continue;
    else if (visited.has(`${nr}:${nc}`)) continue;
    //console.log(input[nr][nc].charCodeAt(0), input[r][c].charCodeAt(0));
    else if (input[nr][nc].charCodeAt(0) - input[r][c].charCodeAt(0) > 1)
      continue;
    else if (nr == er && nc == ec) {
      console.log("Answer: ", d + 1);
      acc = d + 1;
      return;
    } else {
      visited.add(`${nr}:${nc}`);
      q.push([d + 1, nr, nc]);
    }
  }
}
//console.log(q);

console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim().split("");
  });
}
