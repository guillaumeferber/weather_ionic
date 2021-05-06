import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BackgroundModule } from '../background/background.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BackgroundModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
