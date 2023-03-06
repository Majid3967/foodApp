import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,private storage:Storage) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMNXA1ZS8Cts5BB4aAcmjzR3D2USQlGVQ',
      { email, password, returnSecureToken: true }
    ).pipe(tap(this.handleUser.bind(this)));
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMNXA1ZS8Cts5BB4aAcmjzR3D2USQlGVQ',
      { email, password, returnSecureToken: true }
    ).pipe(tap(this.handleUser.bind(this)));
  }

  isAuthenticated(){
    let userExist:User;
    this.storage.get('user').then(res=>{
      userExist = res as User;

      if(userExist){
        this.userSub.next(userExist);
      }
    })

    return this.userSub.value?.email != null
   }

  logout(){
    this.userSub.next(null);
    this.storage.clear();
  }

  private handleUser(response: AuthResponseData) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expireDate
    );
    this.userSub.next(user);

    this.storage.set('user',this.userSub.value).then()
  }
}
