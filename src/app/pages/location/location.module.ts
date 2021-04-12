import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPage } from './location.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { LocationPageRoutingModule } from './location-routing.module';
import { SearchModule } from './search/search.module';
import { ResultsModule } from './results/results.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LocationPageRoutingModule,
    SearchModule,
    ResultsModule
  ],
  declarations: [LocationPage]
})
export class Tab2PageModule {}
