import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FoodItem } from 'src/app/models/foodItem';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @Input() selectedFoodItem!: FoodItem
  itemCount=0
  constructor(private modalCtrl: ModalController,private toast:ToastController) { }

  ngOnInit() {
    // console.log(this.selectedFoodItem)
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onAddItem(){
    if(this.itemCount > 0){
    this.modalCtrl.dismiss({
      quantity:this.itemCount,
      price:this.itemCount*this.selectedFoodItem.price

    }, 'confirm');
    return;
    }
    this.toast.create({
      message: 'Select Quantity to Add Item',
      duration: 1500,
      position: 'bottom',
      icon: 'information-circle',
      color: 'primary',
      cssClass: 'toast-style-cart',
    }).then(toastEl=>{
      toastEl.present();
    })
  }

  decreaseQuantity(){
    if(this.itemCount>0)
      this.itemCount--;
  }

  increaseQuantity(){
    this.itemCount++;
  }

}
