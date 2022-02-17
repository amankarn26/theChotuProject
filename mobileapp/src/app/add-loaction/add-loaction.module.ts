import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLoactionPageRoutingModule } from './add-loaction-routing.module';

import { AddLoactionPage } from './add-loaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLoactionPageRoutingModule
  ],
  declarations: [AddLoactionPage]
})
export class AddLoactionPageModule {}
