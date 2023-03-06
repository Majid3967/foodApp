import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponseData } from '../models/auth-response-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

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
    return this.userSub.value?.email != null
   }

  logout(){
    this.userSub.next(null);
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
  }
}
