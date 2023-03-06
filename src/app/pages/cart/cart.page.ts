import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItemList:CartItem[] = [];
  cartTotal:number=0;
  constructor(private route:ActivatedRoute,private cartItemService: CartItemService,private alertCtrl:AlertController,private router:Router) { }

  ngOnInit() {
    this.route.data.subscribe(({cartItems})=>{
      this.cartItemList=cartItems
    })

    this.cartItemList.forEach(item=>{
      this.cartTotal += item.price;
    })
  }

  onCheckout(){
    this.alertCtrl.create({
      header:'Success',
      cssClass:'my-alert',
      message:'Thanks for your time',
      buttons:['OK']
    }).then(alertEl=>{
      alertEl.present()
       this.cartItemService.deleteAllCartItems().subscribe();
      alertEl.onDidDismiss().then(res=>{
        this.router.navigate(['/','home','tabs','home-content'])
      })
    })
  }

  onDelete(cartItem:CartItem){
    this.cartItemService.deleteCartItems(cartItem.id).subscribe();
    this.cartItemList = this.cartItemList.filter(item=> item.id!=cartItem.id);
    this.cartTotal -= cartItem.price;
  }

}
