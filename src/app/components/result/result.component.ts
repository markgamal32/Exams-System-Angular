import { ExamService } from './../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  examId: any;
  exam:any;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private ActivatedRoute:ActivatedRoute,
    private ExamSerivce:ExamService,
    private router:Router,
    private _AuthService:AuthService
  ) {
    this.examId = this.ActivatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    // get exam result
    this._AuthService.RequireLogin("student");
    this.ExamSerivce.getResult(this.examId).subscribe({
      next:(response) =>{
        this.exam = response;
        console.log(response);
        this.viewSuccess();
      },
      error:(error:any) =>{
        console.log(error);
        //this.router.navigate(['/']);
      }
    });
  }

  public surprise(): void {

    const canvas = this.renderer2.createElement('canvas');
 
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
 
    const myConfetti = confetti.create(canvas, {
      resize: true
    });
 
    myConfetti();
 
  }

  viewSuccess(){
    if(this.exam.isPassed){
      this.surprise();
      setTimeout(() => {
        this.surprise();
      }, 1200);
    }
  }
}
