import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
    private URL = 'http://localhost:4200/api';

    constructor(private http: HttpClient) { }

    public historial(quest){
     console.log("pasa historial " + quest);
    return this.http.post(`${this.URL}/historial/${quest}`, quest);

  }
}