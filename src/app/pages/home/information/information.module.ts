import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [InformationComponent]
})
export class InformationModule { }
