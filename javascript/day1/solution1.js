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

/**
 * Given input array of directions ['R5','L2'...] calculate the Manhattan distance of the final point
 * @param input
 */
function findDistance(input) {
  const g = new Grid();

  input.map((movement) => {
    'use strict';
    const direction = movement[0];
    const blocks = movement.slice(1);

    switch (direction.toUpperCase()) {
      case "R": g.moveRight(Number(blocks));
                break;
      case "L": g.moveLeft(Number(blocks));
                break;
    }
  });

  return g.calculateDistance();
}
