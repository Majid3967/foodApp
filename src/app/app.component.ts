import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  userEmail!:string
  constructor(private authService:AuthService) {}
  ngOnInit(){
    this.authService.isAuthenticated()
    this.authService.userSub.subscribe(data=>{
      this.userEmail=data?.email!
    })
  }
  onLogout(){
    this.authService.logout();
  }
}
