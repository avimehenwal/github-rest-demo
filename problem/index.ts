export function countSetsOfThree(numbers: Array<Number>, threshold: number) {
  numbers.sort();
  const n = numbers.length;
  let count = 0;
  let belowThresholdCOunt = 0;

  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        count++;
        const triplet = [numbers[i], numbers[j], numbers[k]];
        const sum = triplet.reduce((acc, val) => Number(acc) + Number(val), 0);
        // console.log(`LOOP -- (${triplet}) -- SUM ${sum} <= ${threshold}`);
        if (Number(sum) <= Number(threshold)) {
          belowThresholdCOunt++;
          console.log(`RESULT -- (${triplet}) -- SUM ${sum} <= ${threshold}`);
        }
      }
    }
  }
  console.log(`below Threshold count = ${belowThresholdCOunt}`);
  return belowThresholdCOunt;
}
