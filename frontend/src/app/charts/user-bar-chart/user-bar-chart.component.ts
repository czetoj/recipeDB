import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-bar-chart',
  templateUrl: './user-bar-chart.component.html',
  styleUrls: ['./user-bar-chart.component.scss']
})
export class UserBarChartComponent implements OnInit {

  @Input() amounts: number[] = [];
  @Input() ids: any[] = [];
  @Input() bgc: string[] = [];
  @Input() chartType: any = 'bar';

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  // chartType: any = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.barChartData = [
      { data: this.amounts, label: 'Receptek száma', backgroundColor: this.bgc, hoverBackgroundColor: 'darkgreen', borderColor: 'white', borderWidth: 1 }
    ];
  }
}
