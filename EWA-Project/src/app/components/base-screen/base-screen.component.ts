import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-base-screen',
  templateUrl: './base-screen.component.html',
  styleUrls: ['./base-screen.component.css']
})
export class BaseScreenComponent implements OnInit {
  isAdmin;
  token;
  name;

  constructor(private session: SessionService) {
  }

  ngOnInit() {
    this.token = this.session.token;
    this.name = this.session.currentUser.name + ' ' + this.session.currentUser.lastName;
    this.isAdmin = this.session.checkIfAdmin();
  }

  logOut(){
    this.session.signOff();
  }
}
