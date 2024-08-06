export const roundNumber = (input: number) => {
  return Math.round(input * 10) / 10;
};

export const calculateTime = (second: number) => {
  const minute = Math.floor(second / 60);
  const hour = Math.floor(second / 3600);
  return {
    displaySecond: roundNumber(second % 60),
    displayMinute: minute % 60,
    displayHour: hour,
  };
};

export const padZeros = (input: number, integerLength: number, decimalLength: number) => {
  const stringArr = input.toString().split('.');
  const integer = stringArr[0];
  const decimal = stringArr[1] ?? '0';
  if (decimalLength === 0) {
    return integer!.padStart(integerLength, '0');
  } else {
    return integer!.padStart(integerLength, '0') + '.' + decimal.padEnd(decimalLength, '0');
  }
};
