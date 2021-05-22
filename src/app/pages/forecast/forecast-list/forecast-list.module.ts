import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastListComponent } from './forecast-list.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeHeaderModule } from '../../home/header/header.module';



@NgModule({
  declarations: [
    ForecastListComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    HomeHeaderModule
  ],
  exports: [ ForecastListComponent ]
})
export class ForecastListModule { }
