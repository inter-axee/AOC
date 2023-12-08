const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);
path = input[0];
directions = input[1].split("\n").map((x) => x.trim().split(" = "));

var dmap = new Map();
for (d of directions) {
  dd = d[1].split(", ");
  d1 = dd[0].split("(")[1];
  d2 = dd[1].split(")")[0];
  dmap.set(d[0], [d1, d2]);
}

var acc = 0;
var current = "AAA";
for (i = 0; i < path.length; ) {
  if (current == "ZZZ") {
    break;
  }

  if (path[i] == "L") current = dmap.get(current)[0];
  else current = dmap.get(current)[1];
  acc++;

  if (i == path.length - 1) i = 0;
  else i++;
}
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n\r\n").map((x) => {
    return x.trim();
  });
}
