import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/models/auth-response-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService:AuthService,private loadingCtrl:LoadingController,private router:Router) { }

  ngOnInit() {
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.loadingCtrl.create({keyboardClose:true,message:'Loading....'}).then(
      loadingEl=>{
        let authObs: Observable<AuthResponseData>;
        loadingEl.present();
        if (this.isLogin) {
          authObs = this.authService.login(email,password);
        } else {
          authObs = this.authService.signup(email,password)
        }
        loadingEl.dismiss();
        this.router.navigateByUrl('/home/tabs/home-content');

        authObs.subscribe(
          (response) => {
            console.log(response);
            // this.router.navigate(['']);

          },
          (errorMessage) => {
            // this.error = errorMessage.error.error.message;
            console.log(errorMessage)
          }
        );
      }
    )
  }
}
