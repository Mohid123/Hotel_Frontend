import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomModalComponent } from 'src/app/reusables/custom-modal/custom-modal.component';



@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent,
    CustomModalComponent,
    NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MenuRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MenuModule { }
