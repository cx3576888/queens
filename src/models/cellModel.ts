import type { PuzzleCellType } from "../../scripts/download_puzzle";

export type CurrDisplayType = 'empty' | 'X' | 'queen';
type BorderMarkType = 'nothing' | 'sameColor' | 'differentColor';
type BordersMarkType = {
  top: BorderMarkType;
  right: BorderMarkType;
  bottom: BorderMarkType;
  left: BorderMarkType;
};
type UpdateReactStateFunctions = {
  setCurrDisplay: (currDisplay: CurrDisplayType) => void;
  setIsWrong: (isWrong: boolean) => void;
};
export type ClickType = PuzzleCellType & { display: CurrDisplayType; };

class Cell {
  constructor(
    public readonly row: number,
    public readonly col: number,
    public readonly colorIndex: number,
  ) {
  }

  private _currDisplay: CurrDisplayType = 'empty';
  private _isWrong = false;
  /**
   * Used to determine if cell should be set to x or set back to empty automatically
   * @example
   * -2: cell is queen
   * -1: cell is x, marked by user
   *  0: cell is empty
   * >0: cell is x, marked by automatic x feature
   */
  private _autoXCount = 0;
  private updateReactState: UpdateReactStateFunctions = {
    setCurrDisplay: () => { },
    setIsWrong: () => { },
  };
  public bordersMark: BordersMarkType = { top: 'sameColor', right: 'sameColor', bottom: 'sameColor', left: 'sameColor' };

  get currDisplay() {
    return this._currDisplay;
  }
  set currDisplay(currDisplay: CurrDisplayType) {
    this._currDisplay = currDisplay;
    this.updateReactState.setCurrDisplay(currDisplay);
  }

  get isWrong() {
    return this._isWrong;
  }
  set isWrong(isWrong: boolean) {
    this._isWrong = isWrong;
    this.updateReactState.setIsWrong(isWrong);
  }

  /**********************************************************************************
   * Public Methods
   **********************************************************************************/
  public prepareReactStateFns(functions: UpdateReactStateFunctions) {
    Object.assign(this.updateReactState, functions);
  }

  public prepareBordersMark(topCell?: Cell, rightCell?: Cell, bottomCell?: Cell, leftCell?: Cell) {
    this.bordersMark = {
      top: topCell ? (topCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      right: rightCell ? (rightCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      bottom: bottomCell ? (bottomCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      left: leftCell ? (leftCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
    };
  }

  public reset() {
    this.currDisplay = 'empty';
    this.isWrong = false;
    this._autoXCount = 0;
  }

  public toggleCurrDisplay() {
    switch (this.currDisplay) {
      case 'empty':
        this.currDisplay = 'X';
        this._autoXCount = -1;
        break;
      case 'X':
        this.currDisplay = 'queen';
        this._autoXCount = -2;
        break;
      case 'queen':
        this.currDisplay = 'empty';
        this._autoXCount = 0;
        break;
    }
  }

  public isAffectedBy(latestClick: ClickType) {
    if (this.isSelf(latestClick)) {
      return false;
    }
    return this.row === latestClick.row || this.col === latestClick.col || this.colorIndex === latestClick.colorIndex || this.isNeighbor(latestClick);
  }

  public autoSetCurrDisplay(latestClick: ClickType) {
    if (this._autoXCount < 0) {
      return;
    }
    switch (latestClick.display) {
      case 'X':
        // do nothing
        break;
      case 'queen':
        // check if we should set cell from empty to x automatically
        this._autoXCount++;
        if (this._autoXCount === 1) {
          this.currDisplay = 'X';
        }
        break;
      case 'empty':
        // check if we should set cell from x to empty automatically
        if (this._autoXCount > 0) {
          this._autoXCount--;
          if (this._autoXCount === 0) {
            this.currDisplay = 'empty';
          }
          break;
        }
    }
  }
  /**********************************************************************************
   * End of Public Methods
   **********************************************************************************/

  /**********************************************************************************
   * Private Methods
   **********************************************************************************/
  private isSelf(latestClick: ClickType) {
    return this.row === latestClick.row && this.col === latestClick.col;
  }

  private isNeighbor(latestClick: ClickType) {
    return !this.isSelf(latestClick) && Math.abs(this.row - latestClick.row) <= 1 && Math.abs(this.col - latestClick.col) <= 1;
  }
  /**********************************************************************************
   * End of Private Methods
   **********************************************************************************/
}

export default Cell;
