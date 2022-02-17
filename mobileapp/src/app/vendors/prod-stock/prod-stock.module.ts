import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdStockPageRoutingModule } from './prod-stock-routing.module';

import { ProdStockPage } from './prod-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdStockPageRoutingModule
  ],
  declarations: [ProdStockPage]
})
export class ProdStockPageModule {}
