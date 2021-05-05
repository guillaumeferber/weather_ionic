import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastInformationComponent } from './forecast-information.component';



@NgModule({
  declarations: [
    ForecastInformationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ForecastInformationComponent]
})
export class ForecastInformationModule { }
