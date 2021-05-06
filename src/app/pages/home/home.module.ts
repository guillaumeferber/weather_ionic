import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderModule } from './header/header.module';
import { InformationModule } from './information/information.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    HeaderModule,
    InformationModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
