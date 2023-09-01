import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from './../services/contact-us.service';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent  {
  /**
   *
   */
  successMessage: any;
  errorMessage: any;
  isSending = false;

  contactUsForm  = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.email,Validators.required]),
    message: new FormControl('',[Validators.minLength(10),Validators.required])
  })

  constructor(private ContactUsService: ContactUsService) {}

  get getName(){
    return this.contactUsForm.controls.name;
  }
  get getEmail(){
    return this.contactUsForm.controls.email
  }
  get getMsg(){
    return this.contactUsForm.controls.message
  }

  onSubmit(e:any): void {
    e.preventDefault();

    if(this.contactUsForm.valid){
      this.isSending = true;
      this.ContactUsService.addMSG(this.contactUsForm.value).subscribe({
        next: () => {
        this.contactUsForm.reset();
        this.isSending = false;
        this.successMessage = "Your message has been sent successfully.";
      },
      error: (err) => {
        this.isSending = false;
        this.errorMessage = "Failed to send your message. Please try again later.";
        console.error(err);
      }
    });
    }
  }

}
