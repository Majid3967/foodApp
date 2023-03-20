import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  userEmail!:string
  constructor(private authService:AuthService,private alertCtrl:AlertController) {}
  ngOnInit(){
    this.authService.isAuthenticated()
    this.authService.userSub.subscribe(data=>{
      this.userEmail=data?.email!
    })
  }
  onLogout(){
    this.authService.logout();

    this.alertCtrl.create({
      header:'Logout Succesfully!',
        cssClass:'my-alert'
    }).then(alertEl=>{
      alertEl.present();
    })
  }
}
