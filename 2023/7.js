const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());
//console.log(input);
letters = { T: "A", J: "B", Q: "C", K: "D", A: "E" };
letter_map = new Map(Object.entries(letters));
//console.log(letter_map);
var replacechars = function (c) {
  return letter_map.get(c) || c;
};

function getOcc(a, h) {
  let c = 0;
  h.split("").forEach((e) => {
    if (a == e) c++;
  });
  return c;
}

function classify(hand) {
  var counts = [];
  hand.split("").forEach((element) => {
    counts.push(getOcc(element, hand));
  });
  //console.log(counts);
  if (counts.includes(5)) return 6;
  if (counts.includes(4)) return 5;
  if (counts.includes(3))
    if (counts.includes(2)) return 4;
    else return 3;
  if (counts.includes(2)) {
    let i = 0;
    counts.forEach((c) => {
      if (c == 2) i++;
    });
    return i / 2;
  }
  return 0;
}

//console.log("hand: ", classify("223AA"));
function cleverSort(a, b) {
  //console.log(a, b, a.length, a[0] > b[0]);
  for (let i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) !== b.charCodeAt(i)) {
      return a.charCodeAt(i) - b.charCodeAt(i);
    }
  }
  return 0;
}

var acc = 0;
var plays = [];
for (line of input) {
  [hand, bid] = line;
  plays.push({ hand, bid });
}
var sortedPlays = plays.sort((p1, p2) => {
  //console.log(p1.hand, p2.hand);
  c1 = p1.hand.split("").map(replacechars).join("");
  cc1 = classify(c1);
  c2 = p2.hand.split("").map(replacechars).join("");
  cc2 = classify(c2);
  // console.log("classify: ", c1, cc1, c2, cc2);
  // console.log(cleverSort(c1, c2));
  if (cc1 > cc2) return 1;
  else if (cc1 < cc2) return -1;
  else return cleverSort(c1, c2);
});
//console.log("sorted: ", sortedPlays);
for (let i = 0; i < sortedPlays.length; i++) {
  acc += (i + 1) * sortedPlays[i].bid;
}
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim().split(" ");
  });
}
