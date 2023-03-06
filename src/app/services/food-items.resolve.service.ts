import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FoodItem } from '../models/foodItem';
import { FoodItemsService } from './food-items.service';

@Injectable({
  providedIn: 'root',
})
export class FoodItemResolveService implements Resolve<FoodItem[]> {
  constructor(private foodItemService: FoodItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): FoodItem[] | Observable<FoodItem[]> | Promise<FoodItem[]> {
    let foodItems = this.foodItemService.getAllFoodItems();
    return foodItems;
  }
}
