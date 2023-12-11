const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//sconsole.log(input);

for ([r, row] of input.entries()) {
  //console.log(r, row);
  for ([c, item] of row.entries()) {
    //console.log(c, item);
    if (item == "S") {
      s = [r, c];
    }
  }
}
//log(s);

var q = [];
q.push([0, s[0], s[1]]);
var visited = [];
visited = new Set();
//visited.add(`${s[0]}:${s[1]}`);
//from = [s[0], s[1]];
var max = -1;
while (q.length) {
  pos = q.shift();
  d = pos[0];
  r = pos[1];
  c = pos[2];
  visited.add(`${r}:${c}`);
  for ([nr, nc, nd] of [
    [r + 1, c, "D"],
    [r - 1, c, "U"],
    [r, c + 1, "R"],
    [r, c - 1, "L"],
  ]) {
    if (nr < 0 || nc < 0 || nr >= input.length || nc >= input[0].length)
      continue;
    else if (visited.has(`${nr}:${nc}`)) continue;
    //console.log("next", input[nr][nc], nd, "prev", input[r][c]);
    found = 0;
    if (nd == "R" && ["-", "L", "S", "F"].includes(input[r][c]))
      if (input[nr][nc] == "J" || input[nr][nc] == "7" || input[nr][nc] == "-")
        found = 1;
    if (nd == "L" && ["-", "7", "S", "J"].includes(input[r][c]))
      if (input[nr][nc] == "F" || input[nr][nc] == "L" || input[nr][nc] == "-")
        found = 1;
    if (nd == "U" && ["|", "L", "S", "J"].includes(input[r][c]))
      if (input[nr][nc] == "F" || input[nr][nc] == "7" || input[nr][nc] == "|")
        found = 1;
    if (nd == "D" && ["|", "7", "S", "F"].includes(input[r][c]))
      if (input[nr][nc] == "J" || input[nr][nc] == "L" || input[nr][nc] == "|")
        found = 1;

    if (found) {
      //console.log("adding", nd);
      q.push([d + 1, nr, nc]);
      if (max < d + 1) max = d + 1;
    }
  }
  //console.log(q);
}

console.log(max);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim().split("");
  });
}
