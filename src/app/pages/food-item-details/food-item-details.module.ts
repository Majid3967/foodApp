import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodItemDetailsPageRoutingModule } from './food-item-details-routing.module';

import { FoodItemDetailsPage } from './food-item-details.page';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodItemDetailsPageRoutingModule,
  ],
  declarations: [FoodItemDetailsPage,CartModalComponent]
})
export class FoodItemDetailsPageModule {}
