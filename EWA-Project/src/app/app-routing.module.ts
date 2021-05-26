import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExplanationComponent} from './components/questionForm/explanation/explanation.component';
import {HelpComponent} from './components/questionForm/help/help.component';
import {StartingScreenComponent} from './components/questionForm/starting-screen/starting-screen.component';
import {ThankYouScreenComponent} from './components/questionForm/thank-you-screen/thank-you-screen.component';
import {FormComponent} from './components/questionForm/form/form.component';
import {ResultsScreenComponent} from './components/questionForm/results-screen/results-screen.component';
import {BaseScreenComponent} from './components/base-screen/base-screen.component';
import {EmployeeHomeScreenComponent} from './components/projects/employee-home-screen/employee-home-screen.component';
import {AccountOverviewComponent} from './components/accounts/accounts-view/account-overview/account-overview.component';
import {AccountCreateComponent} from './components/accounts/account-create/account-create.component';
import {NewProjectComponent} from './components/projects/new-project/new-project.component';
import {LoginScreenComponent} from './components/login-screen/login-screen.component';
import {PersonalInformationFormComponent} from './components/questionForm/personal-information-form/personal-information-form.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProjectsOverviewComponent} from './components/projects/projects-overview/projects-overview.component';
import {ProfileComponent} from './components/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {SessionService} from "./services/session.service";

const routes: Routes = [
  {path: '', component: StartingScreenComponent},
  {path: 'explanation', component: ExplanationComponent},
  {path: 'help', component: HelpComponent},
  {path: 'thanks', component: ThankYouScreenComponent},
  {path: 'form', component: FormComponent},
  {path: 'results', component: ResultsScreenComponent},
  {path: 'base', component: BaseScreenComponent},
  {path: 'home', component: EmployeeHomeScreenComponent, canActivate:[SessionService]},
  {path: 'accounts', component: AccountOverviewComponent, canActivate:[SessionService] },
  {path: 'account-create', component: AccountCreateComponent , canActivate:[SessionService]},
  {path: 'projects', component: ProjectsOverviewComponent , canActivate:[SessionService]},
  {path: 'project-create', component: NewProjectComponent , canActivate:[SessionService]},
  {path: 'profile', component: ProfileComponent , canActivate:[SessionService]},
  {path: 'admin', component : LoginScreenComponent},
  {path: 'personal-information', component: PersonalInformationFormComponent},
  {path: '**', component: PageNotFoundComponent}
];
//TODO Create a second auth guard for admin??

@NgModule({
  imports: [
    RouterModule.forRoot(routes) ,
    HttpClientModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
