import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPage } from './location.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { LocationPageRoutingModule } from './location-routing.module';
import { SearchModule } from './search/search.module';
import { ResultsModule } from './results/results.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LocationPageRoutingModule,
    SearchModule,
    ResultsModule,
    SharedModule
  ],
  declarations: [LocationPage]
})
export class Tab2PageModule {}
