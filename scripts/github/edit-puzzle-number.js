import fs from 'fs';

const fileText = fs.readFileSync(`./src/utils/puzzleUtils.ts`, 'utf-8');
const regex = /export const latestPuzzleNumber = \d+;/;
const updated = fileText.replace(regex, `export const latestPuzzleNumber = ${process.env.PUZZLE_ID};`);
console.log(`- Update latestPuzleNumber to become ${process.env.PUZZLE_ID}`);

fs.writeFileSync(`./src/utils/puzzleUtils.ts`, updated);
