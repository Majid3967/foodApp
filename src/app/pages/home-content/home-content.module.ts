import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeContentPageRoutingModule } from './home-content-routing.module';

import { HomeContentPage } from './home-content.page';
import { MainSliderComponent } from 'src/app/components/main-slider/main-slider.component';
import { FoodItemListComponent } from 'src/app/components/food-item-list/food-item-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeContentPageRoutingModule
  ],
  declarations: [HomeContentPage,MainSliderComponent,FoodItemListComponent]
})
export class HomeContentPageModule {}
