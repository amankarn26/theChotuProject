import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetLoactionPage } from './get-loaction.page';

const routes: Routes = [
  {
    path: '',
    component: GetLoactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetLoactionPageRoutingModule {}
