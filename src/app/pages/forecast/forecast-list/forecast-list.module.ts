import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastListComponent } from './forecast-list.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ForecastListComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule
  ],
  exports: [ ForecastListComponent ]
})
export class ForecastListModule { }
