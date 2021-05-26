import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProjectsService} from '../../../services/projects.service';

@Component({
  selector: 'app-projects-map',
  templateUrl: './projects-map.component.html',
  styleUrls: ['./projects-map.component.css']
})
export class ProjectsMapComponent implements OnInit {
  service: ProjectsService;
  lat: number;
  lon: number;
  map: any;
  fromDate: any;
  toDate: any;
  selectedType: string;
  markerIconURL = '../../../assets/Images/Marker.svg?color=blue';

  constructor(private httpClient: HttpClient, private nav: Router, service: ProjectsService) {
    this.lat = 52.3569703; // Y-as
    this.lon = 4.9028214; // X-as
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    this.fromDate = new Date(year - 1, month, day).toISOString().split('T')[0];
    this.toDate = new Date(year + 1, month, day).toISOString().split('T')[0];
    this.service = service;
    this.selectedType = 'Park';
  }

  ngOnInit() {
    setTimeout(function(service: ProjectsService) {
      service.getAllProjects();
    }, 2000, this.service);
  }

  searchButton() {
    this.service.getProjectsThreeFilters(this.fromDate, this.toDate, this.selectedType);
    return;
  }

  projectButton(ID: number) {
    this.service.currentProjectId = ID;
    return;
  }
}

interface Project {
  ID: any;
  title: string;
  lat: number;
  long: number;
  results: {
    nature: number;
    Playpark: number;
    Gardening: number;
    Excercise: number;
  };
  type: string;
}
