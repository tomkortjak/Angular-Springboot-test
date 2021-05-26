export class Category {

  private _name;
  private _description;
  private _image;


  constructor(name, description, image) {
    this._name = name;
    this._description = description;
    this._image = image;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }
}
