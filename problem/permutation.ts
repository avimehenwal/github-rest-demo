function factorial(n: number): any {
  if (n < 0) {
    return "Number must be positive";
  }

  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function permutation(numbers: Array<Number>, threshold: number) {
  const n = numbers.length;
  let count = 0;

  for (let i = 0; i < n - 2; i++) {
    for (let j = 0; j < n - 1; j++) {
      for (let k = 0; k < n; k++) {
        count++;
        const triplet = [numbers[i], numbers[j], numbers[k]];
        const sum = triplet.reduce((acc, val) => Number(acc) + Number(val), 0);
        console.log(`LOOP -- ${triplet} --> SUM ${sum}`);
      }
    }
  }
  console.log(`All Permutation COUNT - ${count} EXPECTED ${factorial(n)}`);
}

permutation([4, 2, 3, 1].sort(), 7);
