export function hasChance(percentage: number) {
  const value = Math.floor(Math.random() * 101);
  return percentage >= value;
}
