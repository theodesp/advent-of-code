require("babel-register");

const argv = require("minimist")(process.argv.slice(2));
const Future = require('fluture');
const path = require("path");

const readFile = require("../common/readFile");
const Grid = require('./grid');

let input = argv.f;
if (!input) {
  input = "R4, R3, L3, L2, L1, R1, L1, R2, R3, L5, L5, R4, L4, R2, R4, L3, R3, L3, R3, R4, R2, L1, R2, L3, L2, L1, R3, R5, L1, L4, R2, L4, R3, R1, R2, L5, R2, L189, R5, L5, R52, R3, L1, R4, R5, R1, R4, L1, L3, R2, L2, L3, R4, R3, L2, L5, R4, R5, L2, R2, L1, L3, R3, L4, R4, R5, L1, L1, R3, L5, L2, R76, R2, R2, L1, L3, R189, L3, L4, L1, L3, R5, R4, L1, R1, L1, L1, R2, L4, R2, L5, L5, L5, R2, L4, L5, R4, R4, R5, L5, R3, L1, L3, L1, L1, L3, L4, R5, L3, R5, R3, R3, L5, L5, R3, R4, L3, R3, R1, R3, R2, R2, L1, R1, L3, L3, L3, L1, R2, L1, R4, R4, L1, L1, R3, R3, R4, R1, L5, L2, R2, R3, R2, L3, R4, L5, R1, R4, R5, R4, L4, R1, L3, R1, R3, L2, L3, R1, L2, R3, L3, L1, L3, R4, L4, L5, R3, R5, R4, R1, L2, R3, R5, L5, L4, L1, L1".split(", ");
  console.log(findDistance(input));
} else {
  readFile(path.join('./', input), "utf-8")
    .map(text => text.split(", "))
    .fork(console.error, res => {
      'use strict';
      input = res;
      console.log(findDistance(input));
    })
}

function beenCheck(locs, g) {
  'use strict';

}

/**
 * Given input array of directions ['R5','L2'...] calculate the Manhattan distance of the final point
 * @param input
 */
function findDistance(input) {
  const g = new Grid();
  // Keep track of places we've been
  const locs = new Set([g.locationHash()]);
  let inHome = false;

  for (let i = 0; i < input.length && !inHome; i += 1) {
    'use strict';
    const direction = input[i][0];
    const blocks = input[i].slice(1);

    switch (direction.toUpperCase()) {
      case "R":
        for (let j = 1; j <= blocks; j += 1) {
          g.traceMoveRight(1);
          if (locs.has(g.locationHash())) {
            inHome = true;
            break;
          } else {
            locs.add(g.locationHash());
          }
        }
        g.rotateRight();
        break;
      case "L":
        for (let j = 1; j <= blocks; j += 1) {
          g.traceMoveLeft(1);
          if (locs.has(g.locationHash())) {
            inHome = true;
            break;
          } else {
            locs.add(g.locationHash());
          }
        }
        g.rotateLeft();
        break;
    }
  }

  return g.calculateDistance();

}
