const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
seeds = [];
for (i = 0; i < input[0][1][0].length; i += 2)
  seeds.push([input[0][1][0][i], input[0][1][0][i] + input[0][1][0][i + 1]]);

//Blocks
for (i = 1; i < input.length; i++) {
  ranges = input[i][1];
  var n = [];
  while (seeds.length > 0) {
    [s, e] = seeds.pop();
    let bb = 0;
    for ([a, b, c] of ranges) {
      os = Math.max(s, b);
      oe = Math.min(e, b + c);
      if (os < oe) {
        n.push([os - b + a, oe - b + a]);
        if (os > s) seeds.push([s, os]);
        if (e > oe) seeds.push([oe, e]);
        bb = 1;
        break;
      }
    }
    if (bb == 0) n.push([s, e]);
  }
  seeds = n;
}

min = 100000000000;
for (i = 0; i < seeds.length; i++) if (min > seeds[i][0]) min = seeds[i][0];
console.log(min);

function parseInput(input_string) {
  return input_string.split("\n\r\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split(":")
      .map((y) => y.trim())
      .map((z) => {
        if (!isNaN(z[0]))
          return z.split("\r\n").map((o) => o.split(" ").map((p) => +p));
        else return z;
      });
  });
}
