import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatwithdishPage } from './catwithdish.page';

const routes: Routes = [
  {
    path: '',
    component: CatwithdishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatwithdishPageRoutingModule {}
