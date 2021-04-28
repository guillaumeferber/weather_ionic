import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertPipe } from './converter.pipe';



@NgModule({
  declarations: [ConvertPipe],
  imports: [
    CommonModule
  ],
  exports: [ConvertPipe]
})
export class PipesModule { }
