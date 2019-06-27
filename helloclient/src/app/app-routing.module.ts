import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingredientsComponent } from './listingredients/listingredients.component';

const routes: Routes = [
  {
    path:'listingredients',
    component:ListingredientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
