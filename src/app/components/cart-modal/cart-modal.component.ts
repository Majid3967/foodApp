import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodItem } from 'src/app/models/foodItem';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @Input() selectedFoodItem!: FoodItem
  itemCount=0
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log(this.selectedFoodItem)
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onAddItem(){
    this.modalCtrl.dismiss({
      quantity:this.itemCount,
      price:this.itemCount*this.selectedFoodItem.price

    }, 'confirm');
  }

  decreaseQuantity(){
    if(this.itemCount>0)
      this.itemCount--;
  }

  increaseQuantity(){
    this.itemCount++;
  }

}
