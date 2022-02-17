import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularshopPage } from './popularshop.page';

const routes: Routes = [
  {
    path: '',
    component: PopularshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularshopPageRoutingModule {}
