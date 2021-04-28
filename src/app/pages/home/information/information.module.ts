import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InformationComponent } from './information.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [InformationComponent]
})
export class InformationModule { }
