const { log } = require("console");
const { readInFile } = require("../read_input");

const input = parseInput(readInFile());

cache = new Map();

function count(s, c) {
  if (s == "") {
    if (c.length == 0) return 1;
    else return 0;
  }
  if (c.length == 0) {
    if (s.includes("#")) return 0;
    else return 1;
  }
  if (cache.has(`${s}:${c.join()}`)) return cache.get(`${s}:${c.join()}`);
  let result = 0;

  if ([".", "?"].includes(s[0])) result += count(s.slice(1), c);
  //if nums[0] <= len(cfg) and "." not in cfg[:nums[0]] and (nums[0] == len(cfg) or cfg[nums[0]] != "#"):
  if (["#", "?"].includes(s[0]))
    if (
      c[0] <= s.length &&
      !s.slice(0, c[0]).includes(".") &&
      (c[0] == s.length || s[c[0]] != "#")
    )
      result += count(s.slice(c[0] + 1), c.slice(1));

  cache.set(`${s}:${c.join()}`, result);
  return result;
}

//console.log(count("???.###", [1, 1, 3]));
//console.log(count("?###????????", [3, 2, 1]));

var acc = 0;
for (i = 0; i < input.length; i++) {
  [springs, cnt] = input[i].split(" ").map((v, i) => {
    if (i === 1) return v.split(",").map((x) => +x);
    else return v;
  });
  springs5 = "";
  for (j = 0; j < 5; j++) springs5 += j == 4 ? springs : springs + "?";

  cnt5 = new Array(5).fill(cnt).flat();
  //console.log("springs5:", springs5, "cnt5:", cnt5);
  //console.log(count(springs5, cnt5));
  acc += count(springs5, cnt5);
}
console.log(acc);

function parseInput(input_string) {
  return input_string.split("\n").map((x) => {
    //return line.trim();
    return x.trim();
  });
}
