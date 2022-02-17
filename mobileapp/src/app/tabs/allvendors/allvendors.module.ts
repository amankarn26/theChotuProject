import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllvendorsPageRoutingModule } from './allvendors-routing.module';

import { AllvendorsPage } from './allvendors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllvendorsPageRoutingModule
  ],
  declarations: [AllvendorsPage]
})
export class AllvendorsPageModule {}
