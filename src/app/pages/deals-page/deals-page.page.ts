import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FoodItem } from 'src/app/models/foodItem';
import { AuthService } from 'src/app/services/auth.service';
import { FoodItemsService } from 'src/app/services/food-items.service';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.page.html',
  styleUrls: ['./deals-page.page.scss'],
})
export class DealsPagePage implements OnInit {
  dealItems:FoodItem[]=[]
  isLoading=false;
  constructor(private route:ActivatedRoute,private authService:AuthService,private alertCtrl:AlertController,private router:Router) { }

  ngOnInit() {
    this.isLoading = true;
      this.route.data.subscribe(({ foodItems }) => {
        this.dealItems = foodItems;
      });
      this.isLoading = false;
  }

  onCart(){
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
  }

}
