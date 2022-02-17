import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatwithdishPageRoutingModule } from './catwithdish-routing.module';

import { CatwithdishPage } from './catwithdish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatwithdishPageRoutingModule
  ],
  declarations: [CatwithdishPage]
})
export class CatwithdishPageModule {}
