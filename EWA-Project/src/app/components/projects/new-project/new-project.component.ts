import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectsService} from '../../../services/projects.service';
import {Project} from '../../../models/Project';
import {Router} from '@angular/router';
import {ExcelServicesService} from "../../../services/excel.service";
import {QuestionaireResult} from "../../../models/QuestionaireResult";
import {HttpClient} from "@angular/common/http";
import {} from 'googlemaps';
import {QuestionsService} from "../../../services/questions.service";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  service: ProjectsService;
  projectCopy: Project;
  nav: Router;
  markerIconURL = '../../../assets/Images/Marker.svg?color=blue';
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  excel=[];

  operation;
  doOperation: boolean;

  constructor(nav: Router, service: ProjectsService, private http: HttpClient, private serviceExcel: ExcelServicesService, private questionService: QuestionsService) {
    this.service = service;
    this.nav = nav;
    if (this.service.currentProjectId != null) {
      service.currentProject = service.getProject(service.currentProjectId);
    } else {
      service.currentProject = new Project('', undefined, '', new Date(), new Date(),
        undefined, undefined, '', '', '', '', '');
      service.currentProject.xCordinate = 52.406823;
      service.currentProject.yCordinate = 4.82336;
    }
    this.doOperation = false;

  }

  downloadStats():void {
    this.questionService.projectPercentagesParam(this.service.currentProjectId).subscribe(
      res =>{
        this.excel = res;
        console.log(this.excel);
        this.serviceExcel.exportAsExcelFile(this.excel, 'statistieken');
      }
    );
  }

  getJSON() {
    return this.http.get('/assets/json/results.json');

  }

  markerDragEnd(event: any) {
    if (this.service.currentProject != null) {
      this.service.currentProject.yCordinate = event.coords.lng;
      this.service.currentProject.xCordinate = event.coords.lat;
    }
  }

  ngOnDestroy(): void {
    this.service.getAllProjects();
    this.service.currentProjectId = null;
    this.service.currentProject = null;
  }

  saveCurrentProject(opslaan?): void {
    this.doOperation = true;
    this.operation = opslaan;
  }

  deleteCurrentProject(id: number, verwijder?): void {
    this.doOperation = true;
    this.operation = verwijder;
  }

  resetProject(reset?): void {
    this.doOperation = true;
    this.operation = reset;
  }

  cancelOperation(){
    this.doOperation = false;
  }

  confirmOperation(operation: String, id?: number){
    switch (operation) {
      case 'opslaan?':
        this.service.saveProject();
        this.nav.navigate(['projects']);
        break;
      case 'verwijderen?':
        let deleted = this.service.deleteProject(id);
        this.service.currentProject = null;
        this.service.currentProjectId = null;
        this.nav.navigate(['projects']);
        break;
      case 'resetten?':
        this.service.currentProject = Object.assign(new Project(), this.projectCopy);
        this.doOperation = false;
        break;
    }
  }

  ngOnInit(): void {
    this.projectCopy = Object.assign(new Project(), this.service.currentProject);
  }
}
