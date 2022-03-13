import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from 'src/app/reusables/burger/burger.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BurgerComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BurgerComponent
  ]
})
export class SharedModule { }
