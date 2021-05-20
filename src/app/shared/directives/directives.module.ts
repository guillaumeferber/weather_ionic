import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicClassNameDirective } from './dynamic-class-name.directive';



@NgModule({
  declarations: [
    DynamicClassNameDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicClassNameDirective
  ]
})
export class DirectivesModule { }
