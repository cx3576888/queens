/*
How to use:
  1. Run $ yarn build:puzzle-downloader
     This command generates a js file "download_puzzle.js"
  2. Copy all contents of "download_puzzle.js"
  3. Open LinkedIn Queens page (https://www.linkedin.com/games/queens/), open devtool console, paste and run
  4. Put the downloaded json file into "public/puzzles"
*/

type PuzzleCellType = { row: number; col: number; colorIndex: number; };
type PuzzleType = { queens: PuzzleCellType[]; };

function getPuzzleId() {
  let puzzleId = -1;
  const someCodeTags = document.querySelectorAll("[id^='bpr-guid']");
  someCodeTags.forEach((codeTag) => {
    if (codeTag.textContent?.includes('puzzleId')) {
      puzzleId = JSON.parse(codeTag.textContent).included[0].puzzleId;
    }
  });
  return puzzleId;
}

function getPuzzleJson() {
  const res: PuzzleType = { queens: [] };
  const queensGrid = document.querySelector('main')?.querySelector('#queens-grid');
  const queensCells = queensGrid?.querySelectorAll('.queens-cell');
  if (!queensGrid || !queensCells) {
    console.error(`Something wrong!`);
    return res;
  }

  const n = Math.sqrt(queensCells.length);
  queensCells.forEach((queensCell, index) => {
    // LinkedIn index starts at 0, but my index starts at 1
    res.queens.push({
      row: (index - index % n) / n + 1,
      col: index % n + 1,
      colorIndex: getColorIndex(queensCell.className),
    });
  });
  return res;
}

function getColorIndex(className: string) {
  const regex = /cell-color-\d+/g;
  const matches = className.match(regex);
  if (matches) {
    return +matches[0].substring('cell-color-'.length) + 1;
  } else {
    return -1;
  }
}

function downloadPuzzleJson() {
  const puzzleId = getPuzzleId();
  const puzzleJson = getPuzzleJson();

  const puzzleJsonString = JSON.stringify(puzzleJson);
  const blob = new Blob([puzzleJsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `queens${puzzleId}.json`; // file name
  link.click();
}

downloadPuzzleJson();
