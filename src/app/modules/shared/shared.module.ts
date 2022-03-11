import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from 'src/app/reusables/burger/burger.component';

import { RouterModule } from '@angular/router';
import { MenuPickComponent } from 'src/app/reusables/menu-pick/menu-pick.component';



@NgModule({
  declarations: [BurgerComponent, MenuPickComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BurgerComponent,
    MenuPickComponent
  ]
})
export class SharedModule { }
