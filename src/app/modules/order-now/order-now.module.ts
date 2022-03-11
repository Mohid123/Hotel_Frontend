import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderNowRoutingModule } from './order-now-routing.module';
import { OrderNowComponent } from './order-now.component';
import { RadioComponent } from 'src/app/reusables/radio/radio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderNowComponent,
    RadioComponent
  ],
  imports: [
    CommonModule,
    OrderNowRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class OrderNowModule { }
