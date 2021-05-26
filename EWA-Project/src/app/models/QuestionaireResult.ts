import {Project} from './Project';

export class QuestionaireResult {

  id: number;
  exercise: number;
  gardening: number;
  experiencingNature: number;
  meetingPeople: number;
  restAndRelaxation: number;
  zipcode: string;
  sex: string;
  dateOfBirth: Date;
  email: string;
  project: Project;


  constructor(exercise: number, gardening: number, experiencingNature: number,
              meetingPeople: number, restAndRelaxation: number, zipcode?: string, sex?: string,
              dateOfBirth?: Date, email?: string, project?: Project) {
    this.exercise = exercise;
    this.gardening = gardening;
    this.experiencingNature = experiencingNature;
    this.meetingPeople = meetingPeople;
    this.restAndRelaxation = restAndRelaxation;
    this.zipcode = zipcode;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.project = project;
  }


}
