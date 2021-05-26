import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ProjectsService} from "../../../services/projects.service";

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss']
})
export class ProjectsOverviewComponent implements OnInit, OnDestroy, DoCheck {

  executedOperation;
  executedName;

  constructor(private service: ProjectsService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.service.executedOperation = false;
    this.service.executedNameOp = '';
  }

  ngDoCheck(): void {
    this.executedOperation = this.service.executedOperation;
    this.executedName = this.service.executedNameOp;
  }
}
