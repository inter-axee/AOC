const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

//A
//extrarows = 1;
//B
extrarows = 1000000 - 1;

dubblerows = [];
dubblecolumns = [];
for ([r, row] of input.entries()) {
  if (!row.includes("#")) dubblerows.push(r);
}
//console.log("dubble rows", dubblerows);

for (i = 0; i < input.length; i++) {
  hasgalaxy = 0;
  for (j = 0; j < input[0].length; j++) if (input[j][i] == "#") hasgalaxy = 1;
  if (!hasgalaxy) dubblecolumns.push(i);
}

//console.log("dubble columns", dubblecolumns);

galaxies = [];

dr = 0;
dc = 0;
for ([r, row] of input.entries()) {
  //console.log(r, row);
  dc = 0;

  if (dubblerows.includes(r)) dr += extrarows;
  for ([c, item] of row.entries()) {
    //console.log(c, item);

    if (dubblecolumns.includes(c)) dc += extrarows;
    if (item == "#") {
      galaxies.push([dr, dc]);
    }
    dc++;
  }
  dr++;
}
//console.log(galaxies, galaxies.length);
paths = [];
for (i = 0; i < galaxies.length - 1; i += 1) {
  for (j = i + 1; j < galaxies.length; j += 1) {
    /*d = getDistance(
      galaxies[i][0],
      galaxies[i][1],
      galaxies[j][0],
      galaxies[j][1]
    );*/
    dx = Math.abs(galaxies[i][0] - galaxies[j][0]);
    dy = Math.abs(galaxies[i][1] - galaxies[j][1]);
    d = dx + dy;
    //console.log("G 1", galaxies[i], "G 2", galaxies[j], "d", d);
    paths.push(d);
  }
}
//console.log(getDistance(6, 1, 11, 5));
//console.log(paths.length);
console.log(paths.reduce((a, b) => a + b));

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim().split("");
  });
}
