import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderNowRoutingModule } from './order-now-routing.module';
import { OrderNowComponent } from './order-now.component';


@NgModule({
  declarations: [
    OrderNowComponent
  ],
  imports: [
    CommonModule,
    OrderNowRoutingModule
  ]
})
export class OrderNowModule { }
