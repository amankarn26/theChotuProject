import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLoactionPage } from './add-loaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddLoactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLoactionPageRoutingModule {}
