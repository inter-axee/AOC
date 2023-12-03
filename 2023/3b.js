const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

map = new Map();

function hasAdjSymbol(xStart, xEnd, yStart, yEnd, length, num) {
  if (xStart < 0) xStart = 0;
  if (xEnd > input.length - 1) xEnd = input.length - 1;
  if (yStart < 0) yStart = 0;
  if (yEnd > input[0].length - 1) yEnd = input[0].length - 1;

  //console.log("looking", xStart, xEnd, yStart, yEnd);
  for (ii = xStart; ii <= xEnd; ii++) {
    for (jj = yStart; jj <= yEnd; jj++) {
      if (isNaN(input[ii][jj]) && input[ii][jj] == "*") {
        //console.log("symbol", input[ii][jj], map.get(`$(ii):$(jj)`));
        if (map.get(`${ii}:${jj}`) == undefined) map.set(`${ii}:${jj}`, [num]);
        else map.set(`${ii}:${jj}`, [...map.get(`${ii}:${jj}`), num]);
      }
    }
    //console.log("stop looking");
  }
}
acc = 0;
for (i = 0; i < input.length; i++) {
  number = "";
  for (j = 0; j < input[i].length; j++) {
    c = input[i][j];
    if (!isNaN(c)) number += c;
    if ((isNaN(c) || j == input[i].length - 1) && number.length > 0) {
      n = parseInt(number);
      l = number.length;
      //console.log(number, n, l);
      number = "";
      if (hasAdjSymbol(i - 1, i + 1, j - l - 1, j, l, n)) {
        acc += n;
      }
    }
  }
}
//console.log(map);
map.forEach((element) => {
  if (element.length == 2) acc += element[0] * element[1];
});
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim().split("");
  });
}
