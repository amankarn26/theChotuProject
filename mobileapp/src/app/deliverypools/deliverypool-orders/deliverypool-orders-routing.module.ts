import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverypoolOrdersPage } from './deliverypool-orders.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverypoolOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverypoolOrdersPageRoutingModule {}
