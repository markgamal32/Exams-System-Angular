import { Answers } from './Interfaces/answers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from './Interfaces/exam';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { CustomClaims } from './Interfaces/CustomClaims';


@Injectable({
  providedIn: 'root'
})
export class ExamService {


  baseURL: string = 'https://localhost:7275/api/Exam';
  constructor(private http: HttpClient, private _AuthService: AuthService) { }
  getAllProducts() {
    return this.http.get(this.baseURL);
  }
  // exam msh product :D
  getProductById(productId: any) {
    return this.http.get(`${this.baseURL}/${productId}`);
  }

  getExam(id: any): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseURL}/${id}`);
  }

  store(examId: any, selectedOptions: number[]) {
    const userData = this._AuthService.userData.value;
    const email = userData[CustomClaims.Email];
    const answers: Answers = {
      examId: parseInt(examId),
      selectedOptions: selectedOptions,
      email: email
    };
    return this.http.post(this.baseURL, answers);
  }

  getResult(examId: number) {
    // Get user data from BehaviorSubject
    const userData = this._AuthService.userData.value;

    const email = userData[CustomClaims.Email];
    const data = {
      examId,
      email
    };

    return this.http.post(`${this.baseURL}/examResult`, data);

  }

  CheckUserExam(examId: number) {

    const userData = this._AuthService.userData.value;

    const email = userData[CustomClaims.Email];
    const data = {
      examId,
      email
    };

    return this.http.post(`${this.baseURL}/CheckUserExam`, data);
  }

  storeExam(exam: any) {
    return this.http.post(`${this.baseURL}/storeExam`, exam);
  }

  updateExam(exam: any) {
    return this.http.post(`${this.baseURL}/updateExam`, exam);
  }



  deleteExam(examId: number) {
    return this.http.delete(`${this.baseURL}/DeleteExam/${examId}`);
  }

}
