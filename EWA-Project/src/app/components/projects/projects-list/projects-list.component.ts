import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  service: ProjectsService;
  start: any;
  end: any;
  title: string;
  hood: string;

  constructor(service: ProjectsService) {
    this.service = service;
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    this.start = new Date(year - 1, month, day).toISOString().split('T')[0];
    this.end = new Date(year + 1, month, day).toISOString().split('T')[0];
    this.hood = '';
    this.title = '';
  }

  ngOnInit() {
    setTimeout(function(service: ProjectsService) {
      service.getAllProjects();
    }, 2000, this.service);
  }

  updateCurrentProject(projectId: number) {
    this.service.currentProjectId = projectId;
  }

  search() {
    if (this.title == null && this.hood == null || this.title.trim() == '' && this.hood == null ||
      this.title.trim() == '' && this.hood.trim() == '' || this.title == null && this.hood.trim() == '') {
      this.service.getProjectsFourFilters(this.start, this.end);
    } else if (this.title == null && this.hood != null || this.hood != null && this.title.trim() == '') {
      this.service.getProjectsFourFilters(this.start, this.end, null, this.hood);
    } else if (this.title != null && this.hood == null || this.title != null && this.hood.trim() == '') {
      this.service.getProjectsFourFilters(this.start, this.end, this.title);
    } else if (this.title != null && this.hood != null) {
      this.service.getProjectsFourFilters(this.start, this.end, this.title, this.hood);
    }
    return;
  }
}
