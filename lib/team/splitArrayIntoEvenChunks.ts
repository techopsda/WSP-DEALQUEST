export const splitArrayIntoEvenChunks = (teamArray: string[], chunkSizes: number) => {
  let amountOfChunks = 1;
  const teamArrayLength = teamArray.length;

  let dividedTeams = teamArrayLength;

  while (dividedTeams > chunkSizes) {
    amountOfChunks++;
    dividedTeams = teamArrayLength / amountOfChunks;
  }

  const numberOfSmallChunks = amountOfChunks - (teamArrayLength % amountOfChunks);
  const smallNumberOfItems = Math.floor(teamArrayLength / amountOfChunks);

  const numberOfLargeChunks = teamArrayLength % amountOfChunks;
  const largeNumberOfItems = Math.floor(teamArrayLength / amountOfChunks) + 1;

  const chunks: Array<Array<string>> = [];
  let currentIndex = 0;

  const addChunks = (numberOfChunks: number, numberOfItems: number) => {
    for (let numOfChunks = 1; numOfChunks <= numberOfChunks; numOfChunks++) {
      const chunk: string[] = [];
      for (let numOfItems = 1; numOfItems <= numberOfItems; numOfItems++) {
        chunk.push(teamArray[currentIndex]);
        currentIndex++;
      }
      chunks.push(chunk);
    }
  };

  addChunks(numberOfSmallChunks, smallNumberOfItems);
  addChunks(numberOfLargeChunks, largeNumberOfItems);

  return chunks;
};
