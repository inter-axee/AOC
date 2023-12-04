const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input[0]);

var acc = 0;

for (i = 0; i < input.length; i++) {
  let wc = input[i][0];
  let dc = input[i][1];
  let tot = 0;
  for (w = 0; w < wc.length; w++) {
    for (c = 0; c < dc.length; c++) {
      if (dc[c] === wc[w]) {
        //console.log("found", dc[c], c, wc[w], w);
        tot++;
      }
    }
  }

  if (tot != 0) acc += Math.pow(2, tot - 1);
}

//not 563358
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split(": ")[1]
      .split("|")
      .map(
        (y) =>
          y
            .trim()
            .split(" ")
            .map((a) => +a)
            .filter((z) => {
              if (z != 0) return z;
            })
        //.map((a) => +a)
      );
  });
}
