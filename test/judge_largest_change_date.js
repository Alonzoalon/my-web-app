import process from "process";
import { strict as assert } from "node:assert";
import ANSWER from "../answer_largest_change_date.js";

if (!ANSWER) {
  console.log("Missing default export in answer_largest_change.js.");
  process.exit(1);
}

const results = [];

results.push(
  assert(
    ANSWER.largestChange.date === "2022/1/12",
    "largestChange.date is incorrect"
  )
);
results.push(
  assert(ANSWER.largestChange.count === 27, "largestChange.count is incorrect")
);

// Filter empty results out.
const errors = results.filter((msg) => !!msg);
if (errors.length > 0) {
  console.log(errors.join("\n"));
  process.exit(1);
}

console.log("Correct. Congratulations!");
