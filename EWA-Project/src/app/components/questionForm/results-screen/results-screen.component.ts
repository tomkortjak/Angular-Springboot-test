import {Component, OnInit} from '@angular/core';
import {Label, SingleDataSet, ThemeService} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {QuestionsService} from '../../../services/questions.service';

@Component({
  selector: 'app-results-screen',
  templateUrl: './results-screen.component.html',
  styleUrls: ['./results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {

  public userChartData: SingleDataSet = [
    this.service.getResults().get('Experience nature'),
    this.service.getResults().get('Gardening'),
    this.service.getResults().get('Rest & Relaxation'),
    this.service.getResults().get('Meet new people'),
    this.service.getResults().get('Exercise')];
  public userChartLabels: Label[] = ['Experience nature', 'Gardening', 'Rest & relaxation', 'Meet new people', 'Exercise'];
  public userChartLegend: true;
  public projectChartData: SingleDataSet = [
    this.service.getProjectAverages().get('Experience nature'),
    this.service.getProjectAverages().get('Gardening'),
    this.service.getProjectAverages().get('Rest & Relaxation'),
    this.service.getProjectAverages().get('Meet new people'),
    this.service.getProjectAverages().get('Exercise')];
  public projectChartLabels: Label[] = ['Experience nature', 'Gardening', 'Rest & relaxation', 'Meet new people', 'Exercise'];
  public projectChartLegend: true;
  public polarChartType = 'pie';

  constructor(private themeService: ThemeService, private service: QuestionsService) {

  }

  ngOnInit() {
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: {fontColor: 'white'}
      }
    };
    this.themeService.setColorschemesOptions(overrides);
  }


}
