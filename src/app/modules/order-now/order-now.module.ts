import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderNowRoutingModule } from './order-now-routing.module';
import { OrderNowComponent } from './order-now.component';
import { RadioComponent } from 'src/app/reusables/radio/radio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';
import { SpaceDirective } from 'src/app/directives/space.directive';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';


@NgModule({
  declarations: [
    OrderNowComponent,
    RadioComponent,
    SpaceDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    OrderNowRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot({
      showMaskTyped : true,
      // clearIfNotMatch : true
    })
  ]
})
export class OrderNowModule { }
