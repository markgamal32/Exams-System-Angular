import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExamPageComponent } from './components/exam-page/exam-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SingleExamComponent } from './components/single-exam/single-exam.component';
import { ResultComponent } from './components/result/result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminExamsComponent } from './components/admin-exams/admin-exams.component';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { EditExamComponent } from './components/edit-exam/edit-exam.component';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: HomeComponent },

  { path: 'exams', component: ExamPageComponent },
  { path: 'About', component: AboutUsComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'admin/exam', component: AdminExamsComponent },
  { path: 'admin/exam/create', component: CreateExamComponent },
  { path: 'admin/exam/:id/edit', component: EditExamComponent },
  { path: 'exam/:id', component: SingleExamComponent },
  { path: 'exam/result/:id', component: ResultComponent },
  { path: '**', component: NotFoundComponent } // 404 not found with any wrong url


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
