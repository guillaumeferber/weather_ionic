import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { HeaderModule } from './components/header/header.module';
import { DirectivesModule } from './directives/directives.module';



@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    HeaderModule,
    DirectivesModule
  ],
  exports: [
    PipesModule,
    HeaderModule,
    DirectivesModule
  ]
})
export class SharedModule { }
