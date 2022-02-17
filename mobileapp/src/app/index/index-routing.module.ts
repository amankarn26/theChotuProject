import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: 'index',
    component: IndexPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../auth/home/home.module').then( m => m.HomePageModule)
      }
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
      // {
      //   path: '',
      //   redirectTo: '/tabs/tab1',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/index/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
