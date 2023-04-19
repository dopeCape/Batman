function resultStringToArray(result: string): string[] {
  let textArray: string[] = [];
  const arrayLines = result.split("\n\n");

  for (const line of arrayLines) {
    if (line == "") {
      continue;
    }
    const regex = /^\d+\.\s/gm;
    const removedNumber = line.replace(regex, "");
    //   const splitText = removeNumber.split(":");;
    textArray.push(removedNumber);
  }
  return textArray;
}

export { resultStringToArray };
