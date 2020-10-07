import { Component, OnInit } from "@angular/core";
import { AuthenticationService, UserDetails } from "../authentication.service";
import {Router}              from '@angular/router';
import { QuestionsService} from "../questions.service";

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  tasks ={id: String};
  
  constructor(
    private auth: AuthenticationService, 
    private router:Router,
    private taskService: QuestionsService
    ) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
    
  }


  getHistorial(mensaje){
    if(mensaje== "null"){
       
      console.log("primera vez");
     this.getQuestion("00003");
    }else{
      console.log("pregunta 2");
    }
  }
 getQuestion(id){
      this.taskService.getTasks(id)
      .subscribe(
        
        res => {
          this.tasks = res;
          console.log('pasa 2: ' + this.tasks['Enunciado'])
          this.router.navigateByUrl('/question/'+ this.tasks['Enunciado']+'/'+ this.tasks['a']+'/'+ this.tasks['b'] +'/'+ this.tasks['c']+'/'+ this.tasks['d']+'/'+ this.tasks['e']);
        },
        err => console.log(err)
      )
 }


}
