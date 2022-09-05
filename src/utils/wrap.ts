export function wrap(n: number, amountToAdd: number, min = 0, max = 1): number {
  if (n < min || n > max) return -1;

  if (amountToAdd > 0) {
    const leftover = amountToAdd - (max - n);
    return n + amountToAdd > max
      ? wrap(min, leftover, min, max)
      : n + amountToAdd;
  } else if (amountToAdd < 0) {
    const leftover = amountToAdd + (n - min);
    return n + amountToAdd < min
      ? wrap(max, leftover, min, max)
      : n + amountToAdd;
  } else {
    return n;
  }
}
