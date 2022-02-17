import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverypoolOrdersPageRoutingModule } from './deliverypool-orders-routing.module';

import { DeliverypoolOrdersPage } from './deliverypool-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverypoolOrdersPageRoutingModule
  ],
  declarations: [DeliverypoolOrdersPage]
})
export class DeliverypoolOrdersPageModule {}
