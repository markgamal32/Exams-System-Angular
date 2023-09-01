import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../services/exam.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  questionsForm!: FormGroup;
  questionCount = Array.from({ length: 1 }, (_, i) => i + 1);
  submitText:string = "Submit";
  
  constructor(private fb: FormBuilder, private examService: ExamService,private router:Router, private _AuthService:AuthService) { }

  ngOnInit() {
    this._AuthService.RequireLogin('admin');
    this.questionsForm = this.fb.group({
      examName: ['', Validators.required],
      Titles1: ['', Validators.required],
      Options11: ['', Validators.required],
      Options12: ['', Validators.required],
      Options13: ['', Validators.required],
      Options14: ['', Validators.required],
    });
  }
    addNewQuestion() {
      this.questionCount.push(this.questionCount.length + 1);
      const questionControlName = `Titles${this.questionCount.length}`;
      const option1ControlName = `Options${this.questionCount.length}1`;
      const option2ControlName = `Options${this.questionCount.length}2`;
      const option3ControlName = `Options${this.questionCount.length}3`;
      const option4ControlName = `Options${this.questionCount.length}4`;
      const checksControlName = `Checks${this.questionCount.length}`;

      this.questionsForm.addControl(questionControlName, this.fb.control('', Validators.required));
      this.questionsForm.addControl(option1ControlName, this.fb.control('', Validators.required));
      this.questionsForm.addControl(option2ControlName, this.fb.control('', Validators.required));
      this.questionsForm.addControl(option3ControlName, this.fb.control('', Validators.required));
      this.questionsForm.addControl(option4ControlName, this.fb.control('', Validators.required));
      this.questionsForm.addControl(checksControlName, this.fb.control(undefined, Validators.required));
  }

  submitForm() {
    this.submitText = "Sending...";
    const formValue = this.questionsForm.value;
  
    const questions = [];
  
    for (let i = 1; i <= this.questionCount.length; i++) {
      // get the value of the selected radio button for the current question
      const checksValue = (<HTMLInputElement>document.querySelector(`[name=Checks${i}]:checked`))?.value;
  
      const question = {
        title: formValue[`Titles${i}`],
        options: [
          formValue[`Options${i}1`],
          formValue[`Options${i}2`],
          formValue[`Options${i}3`],
          formValue[`Options${i}4`]
        ],
        checks: checksValue
      };
      questions.push(question);
    }
  
    const examForm = {
      examName: formValue.examName,
      questions: questions,
      questionCount: this.questionCount.length
    };
    console.log(examForm);
    this.examService.storeExam(examForm).subscribe({
      next:(response) => {
        Swal.fire({
          title: 'Created Successfully!',
          text: 'Redirecting to Exams Page...',
          icon: 'success',
        });
        setTimeout(()=>{
          this.router.navigate(['/admin/exam/']);
          Swal.close();
        },2500);
      },
      error:(err:any) =>{
        console.log(err);
      }
    });

  }
  
}
