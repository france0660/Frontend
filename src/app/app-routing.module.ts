import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HistorybillComponent } from './pages/historybill/historybill.component';
import { PlaceordersComponent } from './pages/placeorders/placeorders.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
},
{
  path: "",
  component: LayoutComponent,
  children: [
    { path: "home", component: HomeComponent },
    { path: "historybill", component: HistorybillComponent },
    { path: "placeorders", component: PlaceordersComponent },
    { path: "orderlist", component: OrderlistComponent },
  ],
},
  
  
  
  { path: "login", component: LoginComponent },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
