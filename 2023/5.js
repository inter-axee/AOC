const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
console.log(input);

//var acc = 0;
let lowest = 100000000000;
for (i = 0; i < input[0][1][0].length; i++) {
  seed = input[0][1][0][i];
  console.log("\nseed", seed);
  var next = seed;

  for (j = 1; j < input.length; j++) {
    ranges = input[j][1];
    //console.log(ranges);
    let found = 0;
    for (r = 0; r < ranges.length; r++) {
      d = ranges[r][0];
      s = ranges[r][1];
      ra = ranges[r][2];

      if (next >= s && next <= s + ra && found == 0) {
        //console.log("d", d, "s", s, "ra", ra);
        next = d + (next - s);
        //console.log("next: ", next);
        found = 1;
      }
    }
  }
  console.log("next after iterating ranges:", next);
  if (next < lowest) lowest = next;
}
console.log("lowest", lowest);

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
