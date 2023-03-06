import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
})
export class MainSliderComponent implements OnInit {
  img = "https://picsum.photos/400/240"
  constructor() { }

  ngOnInit() {}

  slideOpts = {
    initialSlide: 1,
    speed: 1000,
    autoplay:true
  };

}
