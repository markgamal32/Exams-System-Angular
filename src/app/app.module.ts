import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExamPageComponent } from './components/exam-page/exam-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { SingleExamComponent } from './components/single-exam/single-exam.component';
import { ResultComponent } from './components/result/result.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminExamsComponent } from './components/admin-exams/admin-exams.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { EditExamComponent } from './components/edit-exam/edit-exam.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    ExamPageComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    SingleExamComponent,
    ResultComponent,
    AboutUsComponent,
    ContactUsComponent,
    AdminExamsComponent,
    CreateExamComponent,
    EditExamComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
