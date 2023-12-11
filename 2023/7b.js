/**
 * Rebuild with support from subreddit
 */

const { readInFile } = require("../read_input");
const data = readInFile().split("\n");

function cleverSort(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return b[i] - a[i];
    }
  }
  return 0;
}

function getOcc(a, h) {
  let c = 0;
  h.forEach((e) => {
    if (a == e) c++;
  });
  return c;
}

function frequency(hand) {
  var counts = {};
  hand.forEach((element) => {
    counts[element] = getOcc(element, hand);
  });
  return counts;
}

function run(withJokers = false) {
  const STRENGTH = withJokers ? "J23456789TQKA" : "23456789TJQKA";
  return data
    .map((line) => {
      let [cards, bid] = line.split(" ");
      console.log(cards);
      cards = cards.split("").map((card) => STRENGTH.indexOf(card));
      //console.log("cards", cards);
      const frequencies = frequency(cards);

      //console.log(frequencies);
      let jokers;
      if (withJokers) {
        jokers = frequencies["0"];
        delete frequencies["0"];
      }

      const handHash = Object.values(frequencies).sort((a, b) =>
        a > b ? -1 : 1
      );

      console.log(handHash);
      if (withJokers && jokers) {
        handHash[0] ??= 0;
        handHash[0] += jokers;
      }
      console.log(handHash);

      return { sort: handHash.concat(cards), bid: Number(bid) };
    })
    .sort((a, b) => {
      return cleverSort(b.sort, a.sort);
    })
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((a, b) => a + b);
}

//console.log("Part 1", run(false));
console.log("Part 2", run(true)); //251336672
