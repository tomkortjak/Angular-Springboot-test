import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private _BASE_URL: string;
  private _currentProjectId: number;
  private _currentProject: Project;
  private _projects: Project[];

  executedOperation: boolean;
  executedNameOp: String;

  constructor(private http: HttpClient) {
    this._BASE_URL = 'http://localhost:8081';
  }

  async getAllProjects() {
    this.http.get<Project[]>(this._BASE_URL + '/rest/projects')
      .subscribe(
        projects => {
          this._projects = projects ? projects : [];
        },
        error => console.log(error)
      );
  }

  getProjectsThreeFilters(start: string, end: string, type: string) {
    let parameters = new HttpParams().set('type', type).set('end', end).set('start', start);

    this.http.get<Project[]>(this._BASE_URL + '/rest/projects', {params: parameters})
      .subscribe(
        projects => {
          this._projects = projects ? projects : [];
        },
        error => console.log(error)
      );
  }

  getProjectsFourFilters(start?: string, end?: string, title?: string, hood?: string) {
    let parameters = new HttpParams();
    if (start != null) {
      parameters = parameters.set('start', start);
    }
    if (end != null) {
      parameters = parameters.set('end', end);
    }
    if (title != null) {
      parameters = parameters.set('title', title);
    }
    if (hood != null) {
      parameters = parameters.set('hood', hood);
    }

    this.http.get<Project[]>(this._BASE_URL + '/rest/projects', {params: parameters})
      .subscribe(
        projects => {
          this._projects = projects ? projects : [];
        },
        error => console.log(error)
      );
  }

  saveProject() {
    if (this.currentProjectId == null) {
      this.currentProject.code = (Math.floor(Math.random() * 9999) + 1000).toString();
      console.log(JSON.stringify(this.currentProject));
      return this.http.post<Project>(this._BASE_URL + '/rest/projects', this.currentProject)
        .subscribe();
    } else {
      return this.http.put<Project>(this._BASE_URL + '/rest/projects/' + this.currentProjectId, this.currentProject)
        .subscribe(response => {
            console.log('received bool', response != null);
            this.executedOperation = response != null;
            this.executedNameOp = 'opgeslagen';
            return response != null;
          },
          error => console.log(error));
    }
  }

  deleteProject(id: number): boolean {
    this.http.delete(this._BASE_URL + '/rest/projects/' + id)
      .subscribe(
        response => {
          this.executedOperation = response != null;
          this.executedNameOp = 'verwijderd';
          return response;
        },
        error => console.log(error)
      );
    return false;
  }

  getProject(id: number): Project {
    this.http.get<Project>(this._BASE_URL + '/rest/projects/' + id)
      .subscribe(
        event => {
          this._currentProject = event ? event : null;
          return this.currentProject;
        },
        error => console.log(error)
      );
    return null;
  }

  get projects(): Project[] {
    return this._projects;
  }

  get currentProjectId(): number {
    return this._currentProjectId;
  }

  set currentProjectId(value: number) {
    this._currentProjectId = value;
  }

  get currentProject(): Project {
    return this._currentProject;
  }

  set currentProject(value: Project) {
    this._currentProject = value;
  }

}
