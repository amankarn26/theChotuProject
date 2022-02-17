import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularshopPageRoutingModule } from './popularshop-routing.module';

import { PopularshopPage } from './popularshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularshopPageRoutingModule
  ],
  declarations: [PopularshopPage]
})
export class PopularshopPageModule {}
