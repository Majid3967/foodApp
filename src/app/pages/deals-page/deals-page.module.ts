import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealsPagePageRoutingModule } from './deals-page-routing.module';

import { DealsPagePage } from './deals-page.page';
import { DealItemComponent } from 'src/app/components/deal-item/deal-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealsPagePageRoutingModule
  ],
  declarations: [DealsPagePage,DealItemComponent]
})
export class DealsPagePageModule {}
