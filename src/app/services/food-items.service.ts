import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FoodItem } from '../models/foodItem';

@Injectable({
  providedIn: 'root',
})
export class FoodItemsService {
  foodItemsList: FoodItem[] = [
    {
      id: '1',
      title: 'Pizza',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas felis sit amet gravida tempus. Nam non imperdiet turpis. Aenean risus erat, pulvinar ultrices commodo a, lobortis nec risus. In fringilla odio et urna congue, volutpat cursus erat bibendum. Vivamus.',
      imageUrl: 'https://picsum.photos/400',
      price: 100,
      catId: '3',
    },
    {
      id: '2',
      title: 'Burger',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas felis sit amet gravida tempus. Nam non imperdiet turpis. Aenean risus erat, pulvinar ultrices commodo a, lobortis nec risus. In fringilla odio et urna congue, volutpat cursus erat bibendum. Vivamus.',
      imageUrl: 'https://picsum.photos/400',
      price: 100,
      catId: '2',
    },
    {
      id: '3',
      title: 'Pepsi',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas felis sit amet gravida tempus. Nam non imperdiet turpis. Aenean risus erat, pulvinar ultrices commodo a, lobortis nec risus. In fringilla odio et urna congue, volutpat cursus erat bibendum. Vivamus.',
      imageUrl: 'https://picsum.photos/400',
      price: 100,
      catId: '4',
    },
    {
      id: '4',
      title: 'Sandwich',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas felis sit amet gravida tempus. Nam non imperdiet turpis. Aenean risus erat, pulvinar ultrices commodo a, lobortis nec risus. In fringilla odio et urna congue, volutpat cursus erat bibendum. Vivamus.',
      imageUrl: 'https://picsum.photos/400',
      price: 100,
      catId: '2',
    },
  ];

  constructor(private http: HttpClient) {}

  getItem(itemId: string) {
    return this.foodItemsList.find((item) => item.id === itemId);
  }

  getAllFoodItems() {
    return this.http
      .get<FoodItem[]>(
        'https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/foodItems.json'
      )
      .pipe(map(response=>{
        let foodItems = []

        for (const key in response) {
          foodItems.push(new FoodItem(
            response[key].id,
            response[key].title,
            response[key].description,
            response[key].imageUrl,
            response[key].price,
            response[key].catId
          ))
        }
        // console.log(foodItems)
        return foodItems;
      }));
  }
}
