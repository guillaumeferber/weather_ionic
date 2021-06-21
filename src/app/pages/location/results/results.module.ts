import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ResultsComponent]
})
export class ResultsModule { }
