import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-exams',
  templateUrl: './admin-exams.component.html',
  styleUrls: ['./admin-exams.component.css']
})
export class AdminExamsComponent implements OnInit {
  Exams: any;
  constructor(private ExamService: ExamService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService.RequireLogin('admin');
    this.ExamService.getAllProducts().subscribe({
      next: (response) => {
        this.Exams = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  deleteExam(examId: number) {
    let con = confirm("Are you sure to delete ?");
    if (con) {
      return this.ExamService.deleteExam(examId).subscribe({
        next: () => {
          console.log("Exam is removed")
          this.Exams = this.Exams.filter((e: any) => e.id !== examId);
        },
        error:(err:any) => {
          console.log(err);
        }
      })
    }
    return;
  }
}




