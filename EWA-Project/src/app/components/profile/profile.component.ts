import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ProjectsService} from "../../services/projects.service";
import {Project} from "../../models/Project";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firstName;
  lastName;
  phone;
  email;
  district;

  image;

  myProjects: Project [];

  constructor(private session: SessionService, private projects: ProjectsService) {
    this.projects.getAllProjects();
  }

  ngOnInit() {
    this.firstName = this.session.currentUser.name;
    this.lastName = this.session.currentUser.lastName;
    this.phone = this.session.currentUser.phoneNumber;
    this.email = this.session.currentUser.email;
    this.district = this.session.currentUser.district;
    this.image = this.session.currentUser.image;

    this.myProjects = this.projects.projects;
  }

}
