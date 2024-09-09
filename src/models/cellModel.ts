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

class Cell {
  constructor(
    public readonly row: number,
    public readonly col: number,
    public readonly colorIndex: number,
  ) {
  }

  private _currDisplay: CurrDisplayType = 'empty';
  private _isWrong: boolean = false;
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

  public prepareReactStateFns(functions: UpdateReactStateFunctions) {
    this.updateReactState.setIsWrong = functions.setIsWrong;
    this.updateReactState.setCurrDisplay = functions.setCurrDisplay;
  }

  public prepareBordersMark(topCell?: Cell, rightCell?: Cell, bottomCell?: Cell, leftCell?: Cell) {
    this.bordersMark = {
      top: topCell ? (topCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      right: rightCell ? (rightCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      bottom: bottomCell ? (bottomCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
      left: leftCell ? (leftCell.colorIndex === this.colorIndex ? 'sameColor' : 'differentColor') : 'nothing',
    };
  }

  public toggleCurrDisplay() {
    switch (this.currDisplay) {
      case 'empty':
        this.currDisplay = 'X';
        break;
      case 'X':
        this.currDisplay = 'queen';
        break;
      case 'queen':
        this.currDisplay = 'empty';
        break;
    }
  }
}

export default Cell;
