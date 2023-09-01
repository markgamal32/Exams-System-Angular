import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'https://localhost:7275/api/Authorization/';
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if (localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
  }

  userData:any=new BehaviorSubject(null);

  saveUserData(){
    //token local && decode
    let encodedToken = JSON.stringify( localStorage.getItem('userToken') );
    let decodedToken:object = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    console.log(this.userData);
    // localStorage.setItem("user",JSON.stringify(this.userData));
  }


  RequireLogin(role:string){

    this.userData.subscribe((userToken:any) => {
      if(userToken){
        if(userToken.roleName != role){
          this._Router.navigate(['/notfound']);
        }
      }else{
        this._Router.navigate(['/notfound']);
      }
    })
  }

//log out function called in navbar.ts file
  signOut(){
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    this.userData.next(null);
    // window.location.reload() ;
    this._Router.navigate(['/']);
  }

//sign up function
  signUp(userData : object):Observable<any> {
    return this._HttpClient.post(`${this.baseURL}register`,userData)
  }

// sign in function
  signIn(userData : object):Observable<any> {
    return this._HttpClient.post(`${this.baseURL}login`,userData)
  }

}
