import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/home', 
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'dashboards', 
    redirectTo: '/dashboard',
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent
  },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
