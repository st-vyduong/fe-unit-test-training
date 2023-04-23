/* eslint-disable no-use-before-define */
import { checkArrIsAsc } from './checkArrIsAsc';

describe('check arr is ascending', () => {
  describe('input is arr has length equal or greater than 2', () => {
    test('Array has element not a number', () => {
      expect(checkArrIsAsc(['a', 1, 2])).toBe(false);
      expect(checkArrIsAsc([undefined, 1, 2])).toBe(false);
      expect(checkArrIsAsc([null, 1, 2])).toBe(false);
      expect(checkArrIsAsc([{}, 1, 2])).toBe(false);
      expect(checkArrIsAsc([false, 1, 2])).toBe(false);
      expect(checkArrIsAsc([true, 1, 2])).toBe(false);
      expect(checkArrIsAsc([() => {}, 1, 2])).toBe(false);
    });
    test('Array is not ascending', () => {
      expect(checkArrIsAsc([1, 2, 6, 5, 4])).toBe(false);
    });
    test('Array is ascending', () => {
      expect(checkArrIsAsc([1, 2, 3])).toBe(true);
      expect(checkArrIsAsc([1, 1, 3])).toBe(true);
      expect(checkArrIsAsc([1.2, 1.4, 3])).toBe(true);
    });
  });

  describe('input is arr has length lower than 2', () => {
    test('array has 0 element', () => {
      expect(checkArrIsAsc([])).toBe(false);
    });
    test('array has 1 element', () => {
      expect(checkArrIsAsc([1])).toBe(false);
    });
  });

  describe('input is not an arr', () => {
    test('boolean', () => {
      expect(checkArrIsAsc(true)).toBe(false);
      expect(checkArrIsAsc(false)).toBe(false);
    });
    test('null', () => {
      expect(checkArrIsAsc(null)).toBe(false);
    });
    test('undefined', () => {
      expect(checkArrIsAsc(undefined)).toBe(false);
    });
    test('string', () => {
      expect(checkArrIsAsc('string')).toBe(false);
    });

    test('object', () => {
      expect(checkArrIsAsc({ a: 1, b: 2 })).toBe(false);
    });
    test('function', () => {
      expect(checkArrIsAsc(() => {})).toBe(false);
    });
   });
});
