import { roundNumber, calculateTime, padZeros } from '../../src/utils/timeUtils';

describe('timeUtils', () => {
  test('roundNumber', () => {
    expect(roundNumber(0.1)).toBe(0.1);
    expect(roundNumber(0.200001)).toBe(0.2);
    expect(roundNumber(0.299999)).toBe(0.3);
    expect(roundNumber(1)).toBe(1);
    expect(roundNumber(2)).toBe(2);
  });

  describe('calculateTime', () => {
    test('1 second = 000:00:01', () => {
      expect(calculateTime(1)).toEqual({ displayHour: 0, displayMinute: 0, displaySecond: 1 });
    });
    test('60 second = 000:01:00', () => {
      expect(calculateTime(60)).toEqual({ displayHour: 0, displayMinute: 1, displaySecond: 0 });
    });
    test('60.1 second = 000:01:00.1', () => {
      expect(calculateTime(60.1)).toEqual({ displayHour: 0, displayMinute: 1, displaySecond: 0.1 });
    });
    test('3599.9 second = 000:59:59.9', () => {
      expect(calculateTime(3599.9)).toEqual({ displayHour: 0, displayMinute: 59, displaySecond: 59.9 });
    });
    test('3600 second = 001:00:00', () => {
      expect(calculateTime(3600)).toEqual({ displayHour: 1, displayMinute: 0, displaySecond: 0 });
    });
    test('3660.1 second = 001:01:00.1', () => {
      expect(calculateTime(3660.1)).toEqual({ displayHour: 1, displayMinute: 1, displaySecond: 0.1 });
    });
  });

  describe('padZeros', () => {
    describe('want 3 digit integer for hour', () => {
      test('0 --> 000', () => {
        expect(padZeros(0, 3, 0)).toBe('000');
      });
      test('1 --> 001', () => {
        expect(padZeros(1, 3, 0)).toBe('001');
      });
      test('12 --> 012', () => {
        expect(padZeros(12, 3, 0)).toBe('012');
      });
      test('123 --> 123', () => {
        expect(padZeros(123, 3, 0)).toBe('123');
      });
      test('1234 --> 1234', () => {
        expect(padZeros(1234, 3, 0)).toBe('1234');
      });
    });

    describe('want 2 digit integer for minute', () => {
      test('0 --> 00', () => {
        expect(padZeros(0, 2, 0)).toBe('00');
      });
      test('1 --> 01', () => {
        expect(padZeros(1, 2, 0)).toBe('01');
      });
      test('12 --> 12', () => {
        expect(padZeros(12, 2, 0)).toBe('12');
      });
    });

    describe('want 2 digit integer plus 1 digit decimal for second', () => {
      test('0 --> 00.0', () => {
        expect(padZeros(0, 2, 1)).toBe('00.0');
      });
      test('1 --> 01.0', () => {
        expect(padZeros(1, 2, 1)).toBe('01.0');
      });
      test('1.2 --> 01.2', () => {
        expect(padZeros(1.2, 2, 1)).toBe('01.2');
      });
      test('12.3 --> 12.3', () => {
        expect(padZeros(12.3, 2, 1)).toBe('12.3');
      });
    });
  });
});
