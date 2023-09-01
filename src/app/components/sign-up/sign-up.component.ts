import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/services/auth.service';
import { Router} from "@angular/router";
import {faSpinner}from "@fortawesome/free-solid-svg-icons"
import { icon } from '@fortawesome/fontawesome-svg-core';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signupForm:FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required,Validators.email]),
    Password: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', Validators.required)
  }
  )
  faSpinner= faSpinner;

  get GetName() {
    return this.signupForm.controls['Name']
  }
  get GetEmail() {
    return this.signupForm.controls['Email']
  }
  get GetPassword() {
    return this.signupForm.controls['Password']
  }
  get GetConfirmPassword() {
    return this.signupForm.controls['ConfirmPassword']
  }

  ConfirmPass(registerform: any) {
    const password = registerform.get('password');
    const repassword = registerform.get('confirmPassword');
    if (password?.value === repassword?.value) {
      return null;
    }
    return repassword?.setErrors({
      rePassMatch: 'Repassword must match with Password',
    });
  }

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage: string = '';
  isLoading: boolean = false;

  submitsignupForm(signupForm: FormGroup) {
    console.log(signupForm.value);
    this.isLoading = true;
    this._AuthService.signUp(signupForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message == 'success') {
          // navigate to login page
          this._Router.navigate(['/SignIn']);
        } else {
          this.errorMessage = response.description;
        }
      },
    });
  }

}
