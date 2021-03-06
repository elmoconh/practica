import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
    private URL = 'http://localhost:4200/api';

    constructor(private http: HttpClient) { }

    public historial(quest, user){
     console.log("pasa historial " + quest);
    return this.http.post(`${this.URL}/historial/${quest}/${user}`, quest);

  }
    public historialOpinion(op, user){
     console.log("pasa historial " + op+user);
    return this.http.post(`${this.URL}/historialOpinion/${op}/${user}`, op);

  }
}
