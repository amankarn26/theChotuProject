import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverypoolsPage } from './deliverypools.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DeliverypoolsPage
  // },
  // {
  //   path: 'deliverypool-home',
  //   loadChildren: () => import('./deliverypool-home/deliverypool-home.module').then( m => m.DeliverypoolHomePageModule)
  // }

  {
    path: 'deliverypools',
    component: DeliverypoolsPage,
    children: [

      {
        path: 'deliverypool-home',
        loadChildren: () => import('./deliverypool-home/deliverypool-home.module').then(m => m.DeliverypoolHomePageModule)
      },
      {
        path: 'deliverypool-orders/:status',
        loadChildren: () => import('./deliverypool-orders/deliverypool-orders.module').then( m => m.DeliverypoolOrdersPageModule)
      },
      {
        path: 'dprofile',
        loadChildren: () => import('./dprofile/dprofile.module').then( m => m.DprofilePageModule)
      },
      // {
      //   path: 'vendor-home',
      //   loadChildren: () => import('./vendor-home/vendor-home.module').then(m => m.VendorHomePageModule)
      // },
      // {
      //   path: 'vendor-orders/:status',
      //   loadChildren: () => import('./vendor-orders/vendor-orders.module').then( m => m.VendorOrdersPageModule)
      // }
      // {
      //   path: 'vendor-orders',
      //   loadChildren: () => import('./vendor-orders/vendor-orders.module').then( m => m.VendorOrdersPageModule)
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/deliverypools/deliverypool-home',
    pathMatch: 'full'
  },
  // {
  //   path: 'dprofile',
  //   loadChildren: () => import('./dprofile/dprofile.module').then( m => m.DprofilePageModule)
  // },
  // {
  //   path: 'deliverypool-orders',
  //   loadChildren: () => import('./deliverypool-orders/deliverypool-orders.module').then( m => m.DeliverypoolOrdersPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverypoolsPageRoutingModule { }
