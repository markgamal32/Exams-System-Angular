import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from './../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam, ExamModel, ExamOption, ExamOptionModel, ExamQuestion, ExamQuestionModel } from '../services/Interfaces/exam';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  examId:any;
  exam!: Exam;
  submitText:string = "Submit";

  examModel: ExamModel = {
    id: 0,
    name: '',
    questionCount: 0,
    examQuestions: []
  };

  constructor(private ExamService:ExamService, private router:Router, private activatedRoute:ActivatedRoute, private _AuthService:AuthService){
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    // get exam data
    this._AuthService.RequireLogin('admin');
    this.ExamService.getExam(this.examId).subscribe({
      next: (exam: Exam) => {
        this.exam = exam;
        console.log(this.exam);
      },
      error:(err:any)=>{
        this.router.navigate(['/notfound']);
      }
    })
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
  
      const examModel: ExamModel = {
        id: this.exam.Id,
        name: formData.examTitle,
        questionCount: this.exam.QuestionCount,
        examQuestions: []
      };
  
      for (let i = 0; i < this.exam.ExamQuestions.$values.length; i++) {
        const question = this.exam.ExamQuestions.$values[i];
        const examQuestion: ExamQuestionModel = {
          id: question.Id,
          title: formData[`questionTitle${i}`],
          options: []
        };
        
        var checkedValue = (<HTMLInputElement>document.querySelector(`[name=question${i}CorrectOption]:checked`))?.value;

        for (let j = 0; j < question.Options.$values.length; j++) {
          const option = question.Options.$values[j];
          const examOption: ExamOptionModel = {
            id: option.Id,
            title: formData[`question${i}OptionTitle${j}`],
            isRight: (j== parseInt(checkedValue)) ? true : false,
            examQuestionId: question.Id
          };
  
          examQuestion.options.push(examOption);
        }
  
        examModel.examQuestions.push(examQuestion);
      }
  
      console.log(examModel);
      this.ExamService.updateExam(examModel).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Updated Successfully!',
            text: 'Redirecting to Exams Page...',
            icon: 'success',
          });
          setTimeout(()=>{
            this.router.navigate(['/admin/exam/']);
            Swal.close();
          },2500);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  
}
