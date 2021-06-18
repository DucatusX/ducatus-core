import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicPage, Nav, NavParams } from 'ionic-angular';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';

@IonicPage({
  name: 'statistic',
  segment: ':chain/:network/statistic'
})
@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage implements OnInit {
  public chainNetwork: ChainNetwork;
  public chain: string;
  public network: string;
  public currentPage: string;
  public data: Array<{ count: number; value: number; time: string }>;
  public txForDay: number;
  public txForWeek: number;
  public volumeForDay: number;
  public volumeForWeek: number;
  public circulation: number;
  public lineChartType: string;
  public lineChartData: {
    labels: string[];
    datasets: Array<{
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
  public lineChartOptions: {};

  constructor(
    private http: HttpClient,
    private apiProvider: ApiProvider,
    public nav: Nav,
    public navParams: NavParams,
    public url: string,
    public currentCurrency: string,
    public days: string,
    public dataType: string,
    public divider: number
  ) {
    const chain: string = this.apiProvider.getConfig().chain;
    const network: string = this.apiProvider.getConfig().network;
    this.url = 'https://ducsite.rocknblock.io/api/v1/statistics/';
    this.chainNetwork = {
      chain,
      network
    };
    this.currentCurrency = chain;
    this.currentPage = 'statistic';
    this.days = '1';
    this.dataType = 'tx';
  }

  // fetch data for statistic from server
  public async fetchData() {
    this.divider = this.currentCurrency === 'DUCX' ? 10 ** 18 : 10 ** 8;
    await this.http
      .get(`${this.url}${this.currentCurrency}/${this.days}`)
      .subscribe(
        (data: {
          daily_count: number;
          weekly_count: number;
          daily_value: number;
          weekly_value: number;
          graph_data: Array<{ count: number; value: number; time: string }>;
        }) => {
          this.txForDay = data.daily_count;
          this.txForWeek = data.weekly_count;
          this.volumeForDay = Math.floor(data.daily_value / this.divider);
          this.volumeForWeek = Math.floor(data.weekly_value / this.divider);
          this.data = data.graph_data;
          this.lineChartType = 'line';
          this.lineChartData = {
            labels: this.getLabels(parseInt(this.days, 10), this.data),
            datasets: [
              {
                data: this.getData(
                  parseInt(this.days, 10),
                  this.dataType,
                  this.data
                ),
                borderColor: '#7C2D35',
                backgroundColor: 'rgba(255, 255, 255, 0)'
              }
            ]
          };
          this.lineChartOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: false,
                  ticks: {
                    padding: 10
                  }
                }
              ],
              offset: true
            },
            responsive: true,
            legend: false,
            elements: {
              line: {
                tension: 0
              }
            }
          };
        }
      );

    await this.http
      .get(`${this.url}${this.currentCurrency.toLowerCase()}_wallets/`)
      .subscribe((data: Array<{ address; balance }>) => {
        let sum = 0;
        data.forEach((user: { address; balance }) => {
          sum += parseInt(user.balance, 10);
        });
        this.circulation = Math.floor(sum / this.divider);
      });
  }

  // get labels for graphic
  public getLabels(
    days: number,
    data: Array<{ count: number; value: number; time: string }>
  ): string[] {
    if (days === 365) {
      const yearLabels = [];

      for (const item of data) {
        yearLabels.push(item.time.substr(0, 10));
      }

      return yearLabels;
    } else if (days === 30) {
      const monthLabels = [];

      for (const item of data) {
        monthLabels.push(item.time.substr(5, 5));
      }

      return monthLabels;
    } else {
      const dayLabels = [];

      for (const item of data) {
        dayLabels.push(item.time.substr(11, 2) + ':00');
      }

      return dayLabels;
    }
  }

  // get default data for graphic
  public getData(
    days: number,
    dataType: string,
    data: Array<{ count: number; value: number; time: string }>
  ): number[] {
    const chartData = [];

    data.forEach(item => {
      if (dataType === 'tx') {
        chartData.push(item.count);
      } else {
        chartData.push(item.value / this.divider);
      }
    });

    return chartData;
  }

  // change type of data for graphic
  public changeType(event: any) {
    const path = event.path ? event.path : event.composedPath();

    if (
      event.target.innerText === 'Volume' &&
      event.target.className === 'chart-panel-item'
    ) {
      path[1].children[0].className = 'chart-panel-item';
      path[1].children[1].className += ' active';
      this.fetchData();
    } else if (
      event.target.innerText === 'Transactions number' &&
      event.target.className === 'chart-panel-item'
    ) {
      path[1].children[0].className += ' active';
      path[1].children[1].className = 'chart-panel-item';
      this.fetchData();
    }

    this.dataType = event.target.innerText === 'Volume' ? 'volume' : 'tx';
  }

  // change time parameter for graphic
  public changeTime(event: any) {
    const path = event.path ? event.path : event.composedPath();

    for (const item of path[1].children) {
      if (
        item.className === 'chart-panel-item' &&
        item.innerText === event.target.innerText
      ) {
        item.className = 'chart-panel-item active';
        this.days =
          item.innerText === '24h'
            ? '1'
            : item.innerText === 'Week'
            ? '7'
            : item.innerText === 'Month'
            ? '30'
            : '365';
        this.fetchData();
      } else if (
        item.className === 'chart-panel-item active' &&
        item.innerText !== event.target.innerText
      ) {
        item.className = 'chart-panel-item';
      }
    }
  }

  ngOnInit() {
    this.fetchData();
  }
}
