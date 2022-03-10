import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderNowComponent } from './order-now.component';

const routes: Routes = [{ path: '', component: OrderNowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderNowRoutingModule { }
