import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart-overview',
  templateUrl: './chart-overview.component.html',
  styleUrls: ['./chart-overview.component.css']
})
export class ChartOverviewComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Nature', 'Excercise', 'Gardening', 'Playpark'];
  public pieChartData: number[] = [300, 500, 100, 150];
  public pieChartData2: number[] = [900, 500, 350, 50];
  public pieChartData3: number[] = [120, 125, 130, 105];
  public pieChartData4: number[] = [90, 80, 200, 201];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartColors = [
    {
      backgroundColor: ['#f0134d', '#ff6f5e', '#f5f0e3', '#40bfc1'],
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
