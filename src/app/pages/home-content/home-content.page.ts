import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FoodItem } from 'src/app/models/foodItem';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.page.html',
  styleUrls: ['./home-content.page.scss'],
})
export class HomeContentPage implements OnInit {
  foodItems: FoodItem[] = [];
  fetchItems: FoodItem[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe(({ foodItems }) => {
      this.foodItems = foodItems;
      this.fetchItems = foodItems;
      this.isLoading = false;
    });

    // this.foodItems = this.foodItemService.foodItemsList;
  }

  onFilterUpdate(value: any) {
    this.isLoading = true;
    if (value.detail.value === '0') {
      this.foodItems = this.fetchItems;
      this.isLoading = false;
      return;
    }
    if (value.detail.value === '1') {
      this.isLoading = true;
      this.foodItems = this.fetchItems.filter((item) => {
        return item.catId === '1';
      });
      this.isLoading = false;
      return;
    }
    if (value.detail.value === '2') {
      this.isLoading = true;
      this.foodItems = this.fetchItems.filter((item) => {
        return item.catId === '2';
      });
      this.isLoading = false;
      return;
    }
    if (value.detail.value === '3') {
      this.isLoading = true;
      this.foodItems = this.fetchItems.filter((item) => {
        return item.catId === '3';
      });
      this.isLoading = false;
      return;
    }
    if (value.detail.value === '4') {
      this.isLoading = true;
      this.foodItems = this.fetchItems.filter((item) => {
        return item.catId === '4';
      });
      this.isLoading = false;
      return;
    }
  }

  onCart() {
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

  }
}
