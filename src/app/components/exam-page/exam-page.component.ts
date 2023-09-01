import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {
  Exams: any;

  constructor(private ExamService: ExamService,private _AuthService:AuthService) {}
  ngOnInit(): void {
    this._AuthService.RequireLogin("student");
    this.ExamService.getAllProducts().subscribe({
      next: (response) => {
        this.Exams = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
