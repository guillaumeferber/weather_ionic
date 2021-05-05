import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { HeaderModule } from './components/header/header.module';



@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    HeaderModule
  ],
  exports: [
    PipesModule,
    HeaderModule
  ]
})
export class SharedModule { }
