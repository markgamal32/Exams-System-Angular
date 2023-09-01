import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  baseURL = "https://localhost:7275/api/ContactUs"
  constructor(private http:HttpClient) { }

  getAllMSGS(){
    return this.http.get(this.baseURL);
  }
  getMSGById(id:any){
    return this.http.get(`${this.baseURL}/${id}`)
  }
  addMSG(msg:any){
    return this.http.post(this.baseURL,msg)
  }
  deleteMSG(id:any){
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  editMSG(msg:any,id:any){
    this.http.put(`${this.baseURL}/${id}`,msg)
  }

}


