import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from 'src/app/reusables/burger/burger.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BurgerComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BurgerComponent
  ],
})
export class SharedModule { }
