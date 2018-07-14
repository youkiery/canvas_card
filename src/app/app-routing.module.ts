import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
