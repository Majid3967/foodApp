import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CartItemService } from './cart-item.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemResolveService implements Resolve<CartItem[]> {
  constructor(private cartItemService:CartItemService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CartItem[] | Observable<CartItem[]> | Promise<CartItem[]> {
    let cartItems = this.cartItemService.getAllCartItems();
    return cartItems;
  }
}
