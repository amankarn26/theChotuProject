import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DprofilePage } from './dprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DprofilePageRoutingModule {}
