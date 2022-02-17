import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllmenutypePageRoutingModule } from './allmenutype-routing.module';

import { AllmenutypePage } from './allmenutype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllmenutypePageRoutingModule
  ],
  declarations: [AllmenutypePage]
})
export class AllmenutypePageModule {}
