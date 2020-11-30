import { Component, OnInit } from '@angular/core';
import {Poll} from './poll';
import { HistorialService } from "../historial.service";
import { ActivatedRoute, Router  } from '@angular/router';
import { QuestionsService} from "../questions.service";
import { AuthenticationService, UserDetails } from "../authentication.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
   details: UserDetails;
   message;
   user:string;
   opinion:Array<Poll>=[]
   hist = new Poll();
   tasks ={id: String, en: String};

constructor(
      private usOpinion : HistorialService,
      private activatedRoute: ActivatedRoute,
      private auth: AuthenticationService, 
      private taskService: QuestionsService,
      private router:Router,

) { }
      
ngOnInit(): void {
    this.user= this.activatedRoute.snapshot.params.us;

    
   this.auth.profile().subscribe(
      user => {
        this.details = user;
//        console.log(this.details['historial'])
      },
      err => {
        console.error(err);
      }
    ); 
  }
  
getOpinion(option){
   var opt;
   console.log(option);
  if(option=="bad"){
    opt = "bad";
    

  }
  if(option=="good"){
        opt = "good";

  }
  if(option=="regular"){
        opt = "regular";

  }
this.saveOpinion(opt);

}

saveOpinion(opt){ 
 console.log(this.user); 
console.log(opt); 


  this.usOpinion.historialOpinion(opt, this.user).subscribe(response => {
    console.log(response);
      this.message ="actualizado";
              }, error => {
            console.log(error);
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