import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';
import {Employee} from "../../models/Employee";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  ggdID;
  ggdpassword;
  status;
  alertstatus = false;

  // @ViewChild('login', {static: false}) loginForm: NgForm;

  constructor(private nav: Router, private session: SessionService ) { }

  ngOnInit() {
    this.ggdID = '';
    this.ggdpassword = '';
  }

  loginButton() {
    if (this.ggdID !== '' && this.ggdpassword !== '' ) {
          try {
            this.session.logIn(this.ggdID, this.ggdpassword).subscribe(
              (res) => {
                setTimeout( () => {
                if (this.session.checkLoggedIn()){
                  let employee: Employee = res.body;
                  this.session.setCurrentUser(employee);
                  this.nav.navigate( ['home'] );
                }
                }, 1000 );
              },
              (error1) =>{
                this.alertstatus = true;
                this.status = 'Onjuiste login gegevens';
              }
            );
          } catch (e) {
            console.log(e);
          }
    } else {
      this.alertstatus = true;
      this.status = 'Graag alle inlog gegevens invullen';
    }
  }

  focus(){
    this.alertstatus = false;
  }


}
