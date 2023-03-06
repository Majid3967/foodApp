import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cartItem';
import { FoodItem } from 'src/app/models/foodItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-food-item-list',
  templateUrl: './food-item-list.component.html',
  styleUrls: ['./food-item-list.component.scss'],
})
export class FoodItemListComponent implements OnInit {
  @Input() foodItems: FoodItem[] = [];
  constructor(
    private modalCtrl: ModalController,
    private cartItemService: CartItemService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router:Router
  ) {}

  ngOnInit() {}

  onAddCart(event: any, item: FoodItem) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.authService.isAuthenticated()){
      this.alertCtrl.create({
        header:'Authentication Required!',
        message:'User authentication required to add items to cart',
        cssClass:'my-alert',
        buttons:[{text:'Login',role:'login'}]
      }).then(alertEl=>{
        alertEl.present();
        return alertEl.onDidDismiss();
      }).then((resData)=>{
        if(resData.role == 'login')
          this.router.navigateByUrl('/auth')
      })
      return;
    }

    this.modalCtrl
      .create({
        component: CartModalComponent,
        componentProps: { selectedFoodItem: item },
        cssClass: 'small-modal',
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then((resData) => {
        // console.log(resData)
        if (resData.role == 'cancel') return;

        let cartItem = new CartItem(
          '1',
          item.title,
          item.imageUrl,
          resData.data.price,
          resData.data.quantity,
          ''
        );
        console.log(cartItem);
        this.cartItemService.addCartItem(cartItem).subscribe((resData) => {
          console.log(resData);
        });
      });
  }
}
