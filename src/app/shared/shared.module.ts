import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { HeaderModule } from './components/header/header.module';
import { DirectivesModule } from './directives/directives.module';
import { BadgeModule } from './components/badge/badge.module';



@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    HeaderModule,
    DirectivesModule,
    BadgeModule
  ],
  exports: [
    PipesModule,
    HeaderModule,
    DirectivesModule,
    BadgeModule
  ]
})
export class SharedModule { }
