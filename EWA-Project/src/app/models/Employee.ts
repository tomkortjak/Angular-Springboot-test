export class Employee {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  startDate: Date;
  admin: boolean;
  image: string;
  department: string;
  district: string;
  phoneNumber: string;

  constructor(email?: string, password?: string, name?: string, lastName?: string, startDate?: Date, admin?: boolean,
              image?: string, department?: string, district?: string, phoneNumber?: string) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.startDate = startDate;
    this.admin = admin;
    this.image = image;
    this.department = department;
    this.district = district;
    this.phoneNumber = phoneNumber;
  }


  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getEmail(): string {
    return this.email;
  }

  set setEmail(value: string) {
    this.email = value;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  get getName(): string {
    return this.name;
  }

  set setName(value: string) {
    this.name = value;
  }

  get getLastName(): string {
    return this.lastName;
  }

  set setLastName(value: string) {
    this.lastName = value;
  }

  get getStartDate(): Date {
    return this.startDate;
  }

  set setStartDate(value: Date) {
    this.startDate = value;
  }

  get getAdmin(): boolean {
    return this.admin;
  }

  set setAdmin(value: boolean) {
    this.admin = value;
  }

  get getImage(): string {
    return this.image;
  }

  set setImage(value: string) {
    this.image = value;
  }

  get getDeparment(): string {
    return this.department;
  }

  set setDepartment(value: string) {
    this.department = value;
  }

  get getDistrict(): string {
    return this.district;
  }

  set setDistrict(value: string) {
    this.district = value;
  }

  get getPhoneNumber(): string {
    return this.phoneNumber;
  }

  set setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }
}
