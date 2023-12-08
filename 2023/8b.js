const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);
path = input[0];
directions = input[1].split("\n").map((x) => x.trim().split(" = "));

//log(path);
//log(directions);

var dmap = new Map();
for (d of directions) {
  dd = d[1].split(", ");
  d1 = dd[0].split("(")[1];
  d2 = dd[1].split(")")[0];
  dmap.set(d[0], [d1, d2]);
}

var endsWithA = [];
var endsWithZ = [];

dmap.forEach((v, k) => {
  if (k[2] == "A") endsWithA.push(k);
  else if (k[2] == "Z") endsWithZ.push(k);
});

var acc = 0;
var current = endsWithA;
var results = [];
for (i = 0; i < path.length; ) {
  if (current.length == 0) break;
  for (a = 0; a < current.length; a++) {
    if (endsWithZ.includes(current[a])) {
      current.splice(a, 1);
      results.push(acc);
    }
  }
  for (a = 0; a < current.length; a++) {
    current[a] =
      path[i] == "L" ? dmap.get(current[a])[0] : dmap.get(current[a])[1];
    /*console.log(
      "a",
      a,
      "path",
      path[i],
      dmap.get(current[a])[0],
      dmap.get(current[a])[1]
    );*/
  }

  acc++;
  if (i == path.length - 1) i = 0;
  else i++;
}
const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);
console.log(results.reduce(lcm));

function parseInput(input_string) {
  return input_string.split("\n\r\n").map((x) => {
    return x.trim();
  });
}
