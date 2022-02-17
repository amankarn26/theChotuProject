import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [



  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../aboutus/aboutus.module').then(m => m.AboutusPageModule)
      },
      // {
      //   path: ':category',
      //   loadChildren: () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
      // },

      // {
      //   path: 'popularshop',
      //   loadChildren: () => import('../popularshop/popularshop.module').then( m => m.PopularshopPageModule)
      // },
      // {
      //   // path: 'firmproductlist/:category/:firm',
      //   path: 'firmproductlist',
      //   loadChildren: () => import('../popularshop/popularshop.module').then( m => m.PopularshopPageModule)
      // },
       {
          path: 'productlist/:category',
          loadChildren: () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
        },

        {
          // work in progress for popular products
          path: 'product-details/:id/:name',
          loadChildren: () => import('../product-details/product-details.module').then( m => m.ProductDetailsPageModule)
        },

      {
        path: 'product-detailss/:id/:name/:firm',
        loadChildren: () => import('../product-details/product-details.module').then( m => m.ProductDetailsPageModule)
      },

      {
        path: 'popularshop/:category/:firm/:name',
        loadChildren: () => import('./popularshop/popularshop.module').then( m => m.PopularshopPageModule)
      },
      // {
      //   path: 'cart',
      //   loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
      // },


      {
        path: 'allproducts',
        loadChildren: () => import('./allproducts/allproducts.module').then( m => m.AllproductsPageModule)
      },

      {
        path: 'allproducts/:id/:name',
        loadChildren: () => import('./allproducts/allproducts.module').then( m => m.AllproductsPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'allvendors',
        loadChildren: () => import('./allvendors/allvendors.module').then( m => m.AllvendorsPageModule)
      }
    ]
  },

  // {
  //   path: 'productlist/:category/:firm',
  //   loadChildren: () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
  // },

  // {
  //   path: 'productlist',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
  //     },
  //     {
  //       path: ':category',
  //       loadChildren: () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
  //     }
  //   ]
  // },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  // {
  //   path: 'allvendors',
  //   loadChildren: () => import('./allvendors/allvendors.module').then( m => m.AllvendorsPageModule)
  // },
  // {
  //   path: 'allproducts',
  //   loadChildren: () => import('./allproducts/allproducts.module').then( m => m.AllproductsPageModule)
  // },
  // {
  //   path: 'popularshop',
  //   loadChildren: () => import('./popularshop/popularshop.module').then( m => m.PopularshopPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
