import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodItem } from 'src/app/models/foodItem';
import { FoodItemsService } from 'src/app/services/food-items.service';

@Component({
  selector: 'app-food-item-details',
  templateUrl: './food-item-details.page.html',
  styleUrls: ['./food-item-details.page.scss'],
})
export class FoodItemDetailsPage implements OnInit {
  foodItem!:FoodItem;

  constructor(private route:ActivatedRoute,private foodItemService:FoodItemsService) { }

  ngOnInit() {
    if(!this.route.snapshot.paramMap.has('itemId'))
      return;

    this.foodItem = this.foodItemService.getItem(this.route.snapshot.paramMap.get('itemId')!)!;
  }

}
