import { describe, expect, test } from "@jest/globals";
import { countSetsOfThree } from "./index";

describe("countSetsOfThree function Test suite", () => {
  test("given base case [1,2,3,4], 7 expect 2", () => {
    expect(countSetsOfThree([1, 2, 3, 4], 7)).toBe(2);
  });

  test("given base case unsorted order [4,3,1,2], 7 expect 2", () => {
    expect(countSetsOfThree([4, 3, 1, 2], 7)).toBe(2);
  });

  test("alternative case unsorted order [4,3,1,2,90,40], 12 expect 4", () => {
    expect(countSetsOfThree([4, 3, 1, 2, 90, 40], 12)).toBe(4);
  });
});
