import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsPage } from './vendors.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: VendorsPage
  // },
  // {
  //   path: 'vendor-home',
  //   loadChildren: () => import('./vendor-home/vendor-home.module').then( m => m.VendorHomePageModule)
  // }

  {
    path: 'vendors',
    component: VendorsPage,
    children: [
      {
        path: 'vendor-home',
        loadChildren: () => import('./vendor-home/vendor-home.module').then(m => m.VendorHomePageModule)
      },
      {
        path: 'vendor-orders/:status',
        loadChildren: () => import('./vendor-orders/vendor-orders.module').then( m => m.VendorOrdersPageModule)
      },
      {
        path: 'prod-stock',
        loadChildren: () => import('./prod-stock/prod-stock.module').then( m => m.ProdStockPageModule)
      },
      {
        path: 'prod-stock-add/:id/:name/:rateunit',
        loadChildren: () => import('./prod-stock/prod-stock.module').then( m => m.ProdStockPageModule)
      },
      {
        path: 'prod-stock-edit/:id/:rateunit',
        loadChildren: () => import('./prod-stock/prod-stock.module').then( m => m.ProdStockPageModule)
      },
      {
        path: 'prod-stock/:id/:name/:rateunit', // rateunit added on 19/9/2020
        loadChildren: () => import('./prod-stock/prod-stock.module').then( m => m.ProdStockPageModule)
      },
      {
        path: 'vprofile',
        loadChildren: () => import('./vprofile/vprofile.module').then( m => m.VprofilePageModule)
      },

      // {
      //   path: 'vendor-orders',
      //   loadChildren: () => import('./vendor-orders/vendor-orders.module').then( m => m.VendorOrdersPageModule)
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/vendors/vendor-home',
    pathMatch: 'full'
  },
  // {
  //   path: 'vprofile',
  //   loadChildren: () => import('./vprofile/vprofile.module').then( m => m.VprofilePageModule)
  // },
  // {
  //   path: 'prod-stock',
  //   loadChildren: () => import('./prod-stock/prod-stock.module').then( m => m.ProdStockPageModule)
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsPageRoutingModule { }
