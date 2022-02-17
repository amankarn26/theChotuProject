import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetLoactionPageRoutingModule } from './get-loaction-routing.module';

import { GetLoactionPage } from './get-loaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetLoactionPageRoutingModule
  ],
  declarations: [GetLoactionPage]
})
export class GetLoactionPageModule {}
