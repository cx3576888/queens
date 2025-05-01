import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const isGithub = process.env.GITHUB_ACTIONS === 'true';
  const launchOptions = isGithub
    ? {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
    : {
      headless: true,
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  await page.goto('https://www.linkedin.com/games/view/queens/desktop/', { waitUntil: 'networkidle0' });

  let puzzleId = -1;
  try {
    await page.waitForSelector('.launch-footer__btn--start');
    puzzleId = await page.evaluate(() => {
      return getPuzzleId();

      function getPuzzleId() {
        const text = document.querySelector('main').querySelector('.launch-footer__score-text').innerText;
        // "編號：366", "No.366"
        const separator = text.includes('：') ? '：' : '.';
        return text.split(separator)[1];
      }
    });
    await page.click('.launch-footer__btn--start');
  } catch {
    const maxPuzzleId = fs
      .readdirSync('./public/puzzles', { withFileTypes: true })
      .filter(file => !file.isDirectory())
      .reduce((maxId, file) => Math.max(maxId, +file.name.slice('queens'.length, -'.json'.length)), 0);
    console.error(`- Get puzzleId failed! Use ${maxPuzzleId} + 1`);
    puzzleId = maxPuzzleId + 1;
  }

  await page.waitForSelector('.queens-grid-no-gap');
  const puzzleJson = await page.evaluate(() => {
    return getPuzzleJson();

    function getPuzzleJson() {
      const res = { queens: [] };
      const queensGrid = document.querySelector('main').querySelector('#queens-grid');
      if (!queensGrid) {
        console.error(`Something wrong when finding #queens-grid!`);
        return res;
      }
      const queensCells = queensGrid.querySelectorAll('.queens-cell-with-border');
      if (!queensCells.length) {
        console.error(`Something wrong when finding .queens-cell-with-border!`);
        return res;
      }

      const n = Math.sqrt(queensCells.length);
      queensCells.forEach((queensCell, index) => {
        // LinkedIn index starts at 0, but my index starts at 1
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
      } else {
        return -1;
      }
    }
  });

  fs.writeFileSync(`./public/puzzles/queens${puzzleId}.json`, JSON.stringify(puzzleJson));
  console.log(`- Download queens${puzzleId}.json success: `, new Date());
  await browser.close();
})();
