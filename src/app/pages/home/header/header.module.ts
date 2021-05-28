import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [HomeHeaderComponent]
})
export class HomeHeaderModule { }
