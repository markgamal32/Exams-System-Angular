import { Answers } from './../services/Interfaces/answers';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from './../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../services/Interfaces/exam';
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-single-exam',
  templateUrl: './single-exam.component.html',
  styleUrls: ['./single-exam.component.css']
})
export class SingleExamComponent implements OnInit {

  examId: any;
  exam!: Exam;
  selectedOptions: number[] = [];
  submitting:string = 'false';
  submitText:string = "Submit Answers";
  isAlreadyTaken:boolean = false;

  
  constructor(
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private _AuthService:AuthService
  ) {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this._AuthService.RequireLogin("student");
     // check if student took this exam before
     this.examService.CheckUserExam(this.examId).subscribe({
      next: (response) => {
        this.isAlreadyTaken = false;
      },
      error:(err:any) => {
        this.isAlreadyTaken = true;
      }
    });
    this.examService.getExam(this.examId).subscribe({
      next: (exam: Exam) => {
        this.exam = exam;
      },
      error: (err: any) => {
        this.router.navigate(['/']);
      }
    });

   
  }

  submit(){
    this.submitting = 'true';
    this.submitText = "Sending...";
   
    this.examService.store(this.examId,this.selectedOptions).subscribe({
      next:(response) => {
        Swal.fire({
          title: 'Sent Successfully!',
          text: 'Redirecting to result...',
          icon: 'success',
        });
        setTimeout(()=>{
          this.router.navigate(['/exam/result/'+this.examId]);
          Swal.close();
        },2500);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }


}
