import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addCartItem(cartItem: CartItem) {
    cartItem.userId = this.authService.userSub.value?.email!;
    return this.http
      .post<{ name: string }>(
        'https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/cartItems.json',
        cartItem
      )
      .pipe(
        switchMap((resData) => {
          cartItem.id = resData.name;
          return this.http.patch<{ name: string }>(
            `https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/cartItems/${resData.name}.json`,
            cartItem
          );
        })
      );
  }

  getAllCartItems() {
    return this.http
      .get<CartItem[]>(
        'https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/cartItems.json'
      )
      .pipe(
        map((response) => {
          let cartItems = [];

          for (const key in response) {
            if (response[key].userId == this.authService.userSub.value?.email) {
              cartItems.push(
                new CartItem(
                  response[key].id,
                  response[key].title,
                  response[key].imageUrl,
                  response[key].price,
                  response[key].quantity,
                  response[key].userId
                )
              );
            }
          }
          return cartItems;
        })
      );
  }
  deleteCartItems(itemId: string) {
    return this.http
      .delete(
        `https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/cartItems/${itemId}.json`
      );
  }

  deleteAllCartItems(){
    return this.http.delete('https://food-app-ionic-7c01d-default-rtdb.firebaseio.com/cartItems.json');
  }
}
