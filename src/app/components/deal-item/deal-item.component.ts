import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/foodItem';

@Component({
  selector: 'app-deal-item',
  templateUrl: './deal-item.component.html',
  styleUrls: ['./deal-item.component.scss'],
})
export class DealItemComponent implements OnInit {
  @Input() dealItems:FoodItem[]=[]
  constructor() { }

  ngOnInit() {}

}
