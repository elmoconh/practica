import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/questions');
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }
}
