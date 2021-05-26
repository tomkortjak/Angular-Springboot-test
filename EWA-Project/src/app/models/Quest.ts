export class Quest {

  private _id;
  private _leftCategory;
  private _rightCategory;
  private _pointsLeft;
  private _pointsRight;


  constructor(id, leftCategory, rightCategory, pointsLeft, pointsRight) {
    this._id = id;
    this._leftCategory = leftCategory;
    this._rightCategory = rightCategory;
    this._pointsLeft = pointsLeft;
    this._pointsRight = pointsRight;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get leftCategory() {
    return this._leftCategory;
  }


  get rightCategory() {
    return this._rightCategory;
  }


  get pointsLeft() {
    return this._pointsLeft;
  }

  set pointsLeft(value) {
    this._pointsLeft = value;
  }

  get pointsRight() {
    return this._pointsRight;
  }

  set pointsRight(value) {
    this._pointsRight = value;
  }
}
