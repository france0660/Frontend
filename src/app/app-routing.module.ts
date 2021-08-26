import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

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
    { path: "home", component: HomeComponent }
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
