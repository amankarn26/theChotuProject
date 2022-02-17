import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewdishPageRoutingModule } from './reviewdish-routing.module';

import { ReviewdishPage } from './reviewdish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewdishPageRoutingModule
  ],
  declarations: [ReviewdishPage]
})
export class ReviewdishPageModule {}
