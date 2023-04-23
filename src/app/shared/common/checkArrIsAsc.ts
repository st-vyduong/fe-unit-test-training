export const checkArrIsAsc = (arr: number[]) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    return false;
  }
  return arr.every((item: number, i: number) => typeof item === 'number'
    && (i === 0 || item >= arr[i - 1]));
};
