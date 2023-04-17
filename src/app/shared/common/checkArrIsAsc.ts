export const checkArrIsAsc = (arr: number[]) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    return false;
  }
  return arr.every((item: number) => typeof item === 'number') &&
        JSON.stringify(arr) === JSON.stringify(arr.sort());
};
