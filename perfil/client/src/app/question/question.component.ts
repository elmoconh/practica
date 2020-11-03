import { Component, OnInit } from '@angular/core';
import {Router}              from '@angular/router';
import { QuestionsService} from "../questions.service";
import { ActivatedRoute } from '@angular/router';
import {Question} from './question';
import { HistorialService } from "../historial.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  question: {id: string, 
      enun: string
      a: string,
      b: string,
      c: string,
      d: string,
      e: string
        };
  message = '';
  corOp: string;

  tasks ={id: String};
  questHist : Array<Question> =[];
  hist = new Question();

  constructor(    
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private taskService: QuestionsService,
    private auth: HistorialService

  ) { }

  ngOnInit() {
   this.question ={
        id: this.activatedRoute.snapshot.params.id,
        enun: this.activatedRoute.snapshot.params.enu,
        a: this.activatedRoute.snapshot.params.a,
        b: this.activatedRoute.snapshot.params.b,
        c: this.activatedRoute.snapshot.params.c,
        d: this.activatedRoute.snapshot.params.d,
        e: this.activatedRoute.snapshot.params.e,

    };
  this.corOp=this.activatedRoute.snapshot.params.res; 
  this.pista("");
  this.option("no contestada");
  this.startTimer();
  }

putHistorial(quest){
  
  this.hist.id = quest;
  this.questHist.push(this.hist);    
  console.log("Historial pregunta:  "+JSON.stringify(this.questHist));
  var userHistorial = JSON.stringify(this.questHist);
 this.auth.historial(userHistorial).subscribe(response => {
    console.log(response);
      this.message ="actualizado";
              }, error => {
            console.log(error);
          }
    );
}

getHistorial(mensaje){
    console.log(mensaje);
    this.putHistorial(mensaje);
    var idNum = parseInt(mensaje);
    console.log(idNum +1 );
     this.nextQuestion(idNum+1);
    }

option(opt){
 var res;  
 console.log(opt   + this.corOp);
  if(opt == this.corOp){
    res = "True";
    console.log("respuesta correcta");
    this.hist.resultado = res;

  }else{
    res = "False";
     console.log("respuesta Incorrecta");
     this.hist.resultado = res;

  }
   if(opt == "no contestada"){
    res = "No contestada";
    this.hist.resultado = res;
   }
  

}    
      
async nextQuestion(id){
  console.log(id);
  this.taskService.getTasks(id).subscribe(
    res  => {
          this.tasks = res;
          console.log('pasa 2: ' + this.tasks['Enunciado'])
          var r = this.tasks['Enunciado'];
          this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(()=>this.router.navigate(['/question/'+ 
          this.tasks['ID']+'/'+
          this.tasks['Enunciado']+'/'+
          this.tasks['a']+'/'+
          this.tasks['b']+'/'+
          this.tasks['c']+'/'+
          this.tasks['d']+'/'+
          this.tasks['e']+'/'+          
          this.tasks['Alternativacorrecta']
          
          ]));

        },
        err => console.log(err)
      )


 }
pista(mensaje){
  var uso;
  if(mensaje){
        uso = 'True'
        console.log(' pista ' + uso);
        this.hist.pista = uso;
       }else{
         uso = 'False'
        console.log(' pista ' + uso);
        this.hist.pista = uso;
       }

  }  

  time: number=1;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.time > 0) {
        this.time++;
        this.hist.tiempo = this.time;

      } 
    },1000)
  }


}
