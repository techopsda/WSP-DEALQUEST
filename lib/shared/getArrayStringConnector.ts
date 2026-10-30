export const getArrayStringConnector = (index: number, arrayLength: number) => {
  if (index !== arrayLength - 1) {
    if (index === arrayLength - 2) return ' & ';
    else return ',';
  }
  return '';
};
