import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllmenutypePage } from './allmenutype.page';

const routes: Routes = [
  {
    path: '',
    component: AllmenutypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllmenutypePageRoutingModule {}
