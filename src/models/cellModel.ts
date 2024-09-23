export type CurrDisplayType = 'empty' | 'X' | 'queen';
export type PuzzleCellWithDisplayType = PuzzleCellType & { display: CurrDisplayType; };
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

  /**
   * Draw a 3x3 square around the given cell, and check if this cell is inside the square
   */
  public isNeighborOf(givenCell: PuzzleCellType) {
    return Math.abs(this.row - givenCell.row) <= 1 && Math.abs(this.col - givenCell.col) <= 1;
  }

  public isAffectedBy(givenCell: PuzzleCellType) {
    if (this.isSelf(givenCell)) {
      return false;
    }
    return this.row === givenCell.row || this.col === givenCell.col || this.colorIndex === givenCell.colorIndex || this.isNeighborOf(givenCell);
  }

  public isIncludedIn(givenCells: PuzzleCellType[]) {
    return givenCells.some(givenCell => this.isSelf(givenCell));
  }

  public autoSetCurrDisplay(latestClick: PuzzleCellWithDisplayType) {
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
  private isSelf(givenCell: PuzzleCellType) {
    return this.row === givenCell.row && this.col === givenCell.col;
  }
  /**********************************************************************************
   * End of Private Methods
   **********************************************************************************/
}

export default Cell;
