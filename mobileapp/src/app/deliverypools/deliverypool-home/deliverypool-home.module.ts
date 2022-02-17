import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverypoolHomePageRoutingModule } from './deliverypool-home-routing.module';

import { DeliverypoolHomePage } from './deliverypool-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverypoolHomePageRoutingModule
  ],
  declarations: [DeliverypoolHomePage]
})
export class DeliverypoolHomePageModule {}
