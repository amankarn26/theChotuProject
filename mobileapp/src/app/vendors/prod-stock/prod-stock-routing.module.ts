import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdStockPage } from './prod-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ProdStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdStockPageRoutingModule {}
