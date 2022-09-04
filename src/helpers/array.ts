export function getRandomGroupElementInArray<T>(
  list: T[],
  groupSize: number
): T[] {
  let baseList = [...list];
  let randomList = [] as T[];

  for (let i = 0; i < groupSize; i++) {
    randomList.push(
      ...baseList.splice(Math.floor(Math.random() * baseList.length), 1)
    );
  }

  return randomList;
}

export function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}
