import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayCardComponent } from "./play-card/play-card.component";

const routes: Routes = [
  //{ path: 'detail/:id', component: HeroDetailComponent },
  { path: 'play-card', component: PlayCardComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
