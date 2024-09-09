function getPuzzleId() {
    let puzzleId = -1;
    const someCodeTags = document.querySelectorAll("[id^='bpr-guid']");
    someCodeTags.forEach((codeTag) => {
        var _a;
        if ((_a = codeTag.textContent) === null || _a === void 0 ? void 0 : _a.includes('puzzleId')) {
            puzzleId = JSON.parse(codeTag.textContent).included[0].puzzleId;
        }
    });
    return puzzleId;
}
function getPuzzleJson() {
    var _a;
    const res = { queens: [] };
    const queensGrid = (_a = document.querySelector('main')) === null || _a === void 0 ? void 0 : _a.querySelector('#queens-grid');
    const queensCells = queensGrid === null || queensGrid === void 0 ? void 0 : queensGrid.querySelectorAll('.queens-cell');
    if (!queensGrid || !queensCells) {
        console.error(`Something wrong!`);
        return res;
    }
    const n = Math.sqrt(queensCells.length);
    queensCells.forEach((queensCell, index) => {
        const row = (index - index % n) / n + 1;
        const col = index % n + 1;
        if (col === 1) {
            res.queens.push([]);
        }
        res.queens[row - 1].push({
            row,
            col,
            colorIndex: getColorIndex(queensCell.className),
        });
    });
    return res;
}
function getColorIndex(className) {
    const regex = /cell-color-\d+/g;
    const matches = className.match(regex);
    if (matches) {
        return +matches[0].substring('cell-color-'.length) + 1;
    }
    else {
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
    link.download = `queens${puzzleId}.json`;
    link.click();
}
downloadPuzzleJson();
export {};
