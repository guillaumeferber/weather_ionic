import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForecastPage } from './forecast.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ForecastPageRoutingModule } from './forecast-routing.module';
import { ForecastListModule } from './forecast-list/forecast-list.module';
import { ForecastInformationModule } from './forecast-information/forecast-information.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ForecastPage }]),
    ForecastPageRoutingModule,
    ForecastListModule,
    ForecastInformationModule,
    SharedModule
  ],
  declarations: [ForecastPage]
})
export class ForecastPageModule {}
