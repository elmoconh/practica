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
  tasks :{ID:string};
  
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
    this.taskService.getTasks()
      .subscribe(
        
        res => {
          this.tasks = res;
        },
        err => console.log(err)
      )
  }

  getQuestion(mensaje){
    if(mensaje== "null"){
      
      console.log(this.tasks);
      
      console.log("primera vez");
      this.router.navigate(['/question/'+ this.tasks['Enunciado']+'/'+this.tasks['a']+'/'+this.tasks['b']+'/'+this.tasks['c']+'/'+this.tasks['d']+'/'+this.tasks['e']]);
    }else{
      console.log("pregunta 2");
    }
  }

  

}
