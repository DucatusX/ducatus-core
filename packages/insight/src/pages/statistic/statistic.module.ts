import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';
import { IonicPageModule, Segment } from 'ionic-angular';
import { ErrorComponentModule } from '../../components/error/error.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';
import { ApiProvider } from '../../providers/api/api';
import { StatisticPage } from './statistic';

@NgModule({
  declarations: [StatisticPage],
  imports: [
    IonicPageModule.forChild(StatisticPage),
    HttpClientModule,
    HeadNavComponentModule,
    LoaderComponentModule,
    ErrorComponentModule,
    ChartModule
  ],
  providers: [
    { provide: String, useValue: 'dummy' },
    { provide: Number, useValue: 1 }
  ],
  exports: [StatisticPage]
})
export class StatisticPageModule {}
