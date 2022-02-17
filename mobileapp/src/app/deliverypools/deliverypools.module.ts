import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverypoolsPageRoutingModule } from './deliverypools-routing.module';

import { DeliverypoolsPage } from './deliverypools.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverypoolsPageRoutingModule
  ],
  declarations: [DeliverypoolsPage]
})
export class DeliverypoolsPageModule {}
