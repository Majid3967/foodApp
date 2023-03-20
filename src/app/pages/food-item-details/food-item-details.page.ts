import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CartModalComponent } from 'src/app/components/cart-modal/cart-modal.component';
import { CartItem } from 'src/app/models/cartItem';
import { FoodItem } from 'src/app/models/foodItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { FoodItemsService } from 'src/app/services/food-items.service';

@Component({
  selector: 'app-food-item-details',
  templateUrl: './food-item-details.page.html',
  styleUrls: ['./food-item-details.page.scss'],
})
export class FoodItemDetailsPage implements OnInit {
  foodItem!: FoodItem;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemsService,
    private cartItemService: CartItemService,
    private authService: AuthService,
    private alertCtrl:AlertController,
    private toast:ToastController,
    private modalCtrl:ModalController,
    private router:Router
  ) {}

  ngOnInit() {
    if (!this.route.snapshot.paramMap.has('itemId')) return;

    console.log( typeof(this.route.snapshot.paramMap.get('itemId')!))

    this.foodItem = this.foodItemService.getItem(
      this.route.snapshot.paramMap.get('itemId')!
    )!;

    console.log(this.foodItem);
  }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      this.alertCtrl
        .create({
          header: 'Authentication Required!',
          message: 'User authentication required to add items to cart',
          cssClass: 'my-alert',
          buttons: [{ text: 'Login', role: 'login' }],
        })
        .then((alertEl) => {
          alertEl.present();
          return alertEl.onDidDismiss();
        })
        .then((resData) => {
          if (resData.role == 'login') this.router.navigateByUrl('/auth');
        });
      return;
    }

    this.modalCtrl
      .create({
        component: CartModalComponent,
        componentProps: { selectedFoodItem: this.foodItem },
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
          this.foodItem.title,
          this.foodItem.imageUrl,
          resData.data.price,
          resData.data.quantity,
          ''
        );
        // console.log(cartItem);
        this.cartItemService.addCartItem(cartItem).subscribe((resData) => {
          console.log(resData);
        });

        this.toast
          .create({
            message: 'Item has been added to Cart',
            duration: 1500,
            position: 'bottom',
            icon: 'trash',
            color: 'primary',
            cssClass: 'toast-style',
          })
          .then((toastItem) => {
            toastItem.present();
          });
      });
  }
}
