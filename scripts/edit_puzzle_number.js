import fs from 'fs';

const fileText = fs.readFileSync(`./src/utils/puzzleUtils.ts`, 'utf-8');
console.log('hihihi', process.env.MY_PUZZLE_ID);
const regex = /export const latestPuzzleNumber = \d+;/;
const updated = fileText.replace(regex, `export const latestPuzzleNumber = ${process.env.MY_PUZZLE_ID};`);
console.log('hihihi', updated);

fs.writeFileSync(`./src/utils/puzzleUtils.ts`, updated);
