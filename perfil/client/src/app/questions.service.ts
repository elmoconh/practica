import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private URL = 'http://localhost:4000/api/question';
  constructor(private http: HttpClient) { }

  getTasks(id):Observable<any>{
    console.log("pasa 1: " + id);
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }
}
