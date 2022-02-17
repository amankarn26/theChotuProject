import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllvendorsPage } from './allvendors.page';

const routes: Routes = [
  {
    path: '',
    component: AllvendorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllvendorsPageRoutingModule {}
