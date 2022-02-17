import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewdishPage } from './reviewdish.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewdishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewdishPageRoutingModule {}
