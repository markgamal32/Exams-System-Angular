import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

isLogin:boolean =false;
username!:string;
Role:boolean=false;

constructor(private _AuthService:AuthService) {}

  ngOnInit(): void {
    this._AuthService.userData.subscribe((userData:any) => {
      if (userData) {
        this.username = userData.name;
        this.Role= (userData.roleName=="admin")?true:false
        this.isLogin = true;
      }else{
        this.isLogin =false;
      }

    });

  }

  LogOut(){
    this._AuthService.signOut()
  }

}
