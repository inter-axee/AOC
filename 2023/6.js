const { log, time } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);

const t = input[0][1]
  .split(" ")
  .map((x) => +x)
  .filter((y) => {
    if (!isNaN(y)) return y;
  });

const record = input[1][1]
  .split(" ")
  .map((x) => +x)
  .filter((y) => {
    if (!isNaN(y)) return y;
  });
log(t, record);
var acc = 1;
for (i = 0; i < t.length; i++) {
  let win = 0;
  for (ms = 0; ms <= t[i]; ms++) {
    timeleft = t[i] - ms;
    distance = timeleft * ms;
    if (distance > record[i]) win++;
  }

  acc *= win;
}

console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x
      .trim()
      .split(":")
      .map((y) => y.trim());
  });
}
