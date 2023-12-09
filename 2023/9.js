const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

function findNext(seq) {
  if (seq.reduce((a, b) => a + b) == 0) return 0;

  deltas = seq.reduce((ac, curr, idx, src) => {
    if (idx === 0) return ac;
    ac.push(curr - src[idx - 1]);
    return ac;
  }, []);
  //console.log("d", deltas);
  diff = findNext(deltas);
  return seq[seq.length - 1] + diff;
}

//console.log(findNext([10, 13, 16, 21, 30, 45]));
var acc = 0;
for (line of input) {
  acc += findNext(line);
}

console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split(" ")
      .map((y) => +y);
  });
}
