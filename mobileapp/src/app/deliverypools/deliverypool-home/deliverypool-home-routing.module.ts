import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverypoolHomePage } from './deliverypool-home.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverypoolHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverypoolHomePageRoutingModule {}
