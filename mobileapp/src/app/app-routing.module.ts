import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [



  {
    path: '',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./vendors/vendors.module').then( m => m.VendorsPageModule)
  },

  {
    path: '',
    loadChildren: () => import('./deliverypools/deliverypools.module').then( m => m.DeliverypoolsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  // {
  //   path: 'all-categories',
  //   loadChildren: () => import('./all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  // },
  {
    path: 'all-categories/:menuname',
    loadChildren: () => import('./all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  },

  {
    path: 'allmenutype',
    loadChildren: () => import('./allmenutype/allmenutype.module').then( m => m.AllmenutypePageModule)
  },

  {
    path: 'allmenutype/:id/:name',
    loadChildren: () => import('./allmenutype/allmenutype.module').then( m => m.AllmenutypePageModule)
  },
  {
    path: 'catwithdish/:id/:name',
    loadChildren: () => import('./catwithdish/catwithdish.module').then( m => m.CatwithdishPageModule)
  },
  {
    path: 'catwithdish',
    loadChildren: () => import('./catwithdish/catwithdish.module').then( m => m.CatwithdishPageModule)
  },
  {
    path: 'reviewdish/:id',
    loadChildren: () => import('./reviewdish/reviewdish.module').then( m => m.ReviewdishPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'getloaction',
    loadChildren: () => import('./get-loaction/get-loaction.module').then( m => m.GetLoactionPageModule)
  },
  {
    path: 'addloaction',
    loadChildren: () => import('./add-loaction/add-loaction.module').then( m => m.AddLoactionPageModule)
  },




  // {
  //   path: 'home',
  //   loadChildren: () => import('./auth/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'popularshop',
  //   loadChildren: () => import('./popularshop/popularshop.module').then( m => m.PopularshopPageModule)
  // },
  // {
  //   path: 'deliverypools',
  //   loadChildren: () => import('./deliverypools/deliverypools.module').then( m => m.DeliverypoolsPageModule)
  // },
  // {
  //   path: 'productlist/:category',
  //   loadChildren: () => import('./productlist/productlist.module').then( m => m.ProductlistPageModule)
  // }
  // ,
  // {
  //   path: 'product-details/:id/:name/:firm',
  //   loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
