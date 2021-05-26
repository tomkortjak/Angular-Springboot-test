export class Project {
  id: number;
  name: string;
  code: string;
  location: string;
  startDate: Date;
  endDate: Date;
  xCordinate: number;
  yCordinate: number;
  status: string;
  description: string;
  type: string;
  neighbourhood: string;
  image: string;

  constructor(name?: string, code?: string, location?: string, startDate?: Date, endDate?: Date, xCordinate?: number,
              yCordinate?: number, status?: string, description?: string, type?: string, neighbourhood?: string, image?: string) {
    this.name = name;
    this.code = code;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.xCordinate = xCordinate;
    this.yCordinate = yCordinate;
    this.status = status;
    this.description = description;
    this.type = type;
    this.neighbourhood = neighbourhood;
    this.image = image;
  }


  get getxCordinate(): number {
    return this.xCordinate;
  }

  set setxCordinate(value: number) {
    this.xCordinate = value;
  }

  get getyCordinate(): number {
    return this.yCordinate;
  }

  set setyCordinate(value: number) {
    this.yCordinate = value;
  }
}
