import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {FormComponent} from './components/questionForm/form/form.component';
import {ThankYouScreenComponent} from './components/questionForm/thank-you-screen/thank-you-screen.component';
import {StartingScreenComponent} from './components/questionForm/starting-screen/starting-screen.component';
import {ResultsScreenComponent} from './components/questionForm/results-screen/results-screen.component';
import {ChartsModule} from 'ng2-charts';
import { BaseScreenComponent } from './components/base-screen/base-screen.component';
import { EmployeeHomeScreenComponent } from './components/projects/employee-home-screen/employee-home-screen.component';
import { ChartOverviewComponent } from './components/projects/chart-overview/chart-overview.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { AccountOverviewComponent } from './components/accounts/accounts-view/account-overview/account-overview.component';
import { AccountListComponent } from './components/accounts/accounts-view/account-list/account-list.component';
import { AccountListFilterComponent } from './components/accounts/accounts-view/account-list-filter/account-list-filter.component';
import { AccountCreateComponent } from './components/accounts/account-create/account-create.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { ExplanationComponent } from './components/questionForm/explanation/explanation.component';
import { HelpComponent } from './components/questionForm/help/help.component';
import {AgmCoreModule} from '@agm/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {PersonalInformationFormComponent} from './components/questionForm/personal-information-form/personal-information-form.component';
import {ProjectsOverviewComponent} from './components/projects/projects-overview/projects-overview.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProjectsMapComponent} from './components/projects/projects-map/projects-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ThankYouScreenComponent,
    StartingScreenComponent,
    ResultsScreenComponent,
    ExplanationComponent,
    HelpComponent,
    FormComponent,
    BaseScreenComponent,
    EmployeeHomeScreenComponent,
    ChartOverviewComponent,
    ProjectsListComponent,
    AccountOverviewComponent,
    AccountListComponent,
    AccountListFilterComponent,
    AccountCreateComponent,
    NewProjectComponent,
    LoginScreenComponent,
    PersonalInformationFormComponent,
    PageNotFoundComponent,
    ProjectsOverviewComponent,
    ProfileComponent,
    ProjectsMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDESEjVn6ARtJ3J2OXbhtJ3-jpUwX3wjD8'
    }),
    ChartsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
