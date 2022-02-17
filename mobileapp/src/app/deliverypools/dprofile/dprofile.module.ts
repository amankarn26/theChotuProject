import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DprofilePageRoutingModule } from './dprofile-routing.module';

import { DprofilePage } from './dprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DprofilePageRoutingModule
  ],
  declarations: [DprofilePage]
})
export class DprofilePageModule {}
