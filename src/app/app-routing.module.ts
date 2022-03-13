import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'menu', loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'your-order', loadChildren: () => import('./modules/order-now/order-now.module').then(m => m.OrderNowModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
