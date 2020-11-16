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
  tasks ={id: String, en: String};
  
  constructor(
    private auth: AuthenticationService, 
    private router:Router,
    private taskService: QuestionsService
    ) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        console.log(this.details)
      },
      err => {
        console.error(err);
      }
    );
  }


getHistorial(mensaje){
    const histArr =mensaje;
    var  ultReg =  JSON.stringify(histArr[histArr.length -1] );
    console.log(ultReg['pista']);
    var lng = ultReg.search("id");
    console.log("ultimo Registro 1: "+ lng);
    var id=ultReg.substring(lng);
    console.log(id);
    
    var idQuest = id.replace("}", "").replace("id", "").replace(":", " ").replace(/['"]+/g,"");
    console.log(idQuest);

    var numId = parseInt(idQuest, 10);
    console.log(numId);
    console.log("ultimo Registro: "+ (numId + 1));
      console.log("historial" + mensaje.length);
    if(mensaje.length ==1){
       
    console.log("No hay Historial");
     this.getQuestion("1");
    }else{
      console.log("Hay historial");
      this.getQuestion(numId+1);

    }
  }

updQuest(id){
  const idQuest =id;
  console.log(id);
  var transId = JSON.stringify(idQuest);
  var serId = transId.search("id");
  console.log(serId);
  var newArr = transId.substring(serId);
  console.log(newArr);
  var newID = newArr.replace("}", "").replace("id", "").replace(":", "").replace(/['"]+/g,"");
  console.log(newID);
  this.getQuestion(newID);
}

getQuestion(id){
      this.taskService.getTasks(id)
      .subscribe(
        
        res  => {
          this.tasks = res;
          var r = this.tasks['Enunciado'];
          var question = r.replace(" ", "%").replace(","," ");
          console.log(question);
          this.router.navigate(['/question/'+
          this.details['email']+'/'+
          this.tasks['ID']+'/'+
          this.tasks['Enunciado']+'/'+
          this.tasks['a']+'/'+
          this.tasks['b']+'/'+
          this.tasks['c']+'/'+
          this.tasks['d']+'/'+
          this.tasks['e']+'/'+
          this.tasks['Alternativacorrecta']]);
        },
        err => console.log(err)
      )
 }
}

