import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BackgroundModule } from '../background/background.module';



@NgModule({
  declarations: [
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BackgroundModule
  ],
  exports: [HomeHeaderComponent]
})
export class HomeHeaderModule { }
