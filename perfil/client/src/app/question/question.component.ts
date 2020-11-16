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
time : number = 0;
intervalId : number;
display ;
interval;

question: {
      us:string,
      id: string, 
      enun: string
      a: string,
      b: string,
      c: string,
      d: string,
      e: string,  
      corOp: string;

        };
  message = '';

  tasks ={id: String};
  questHist : Array<Question> =[];
  hist = new Question();

constructor(    
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private taskService: QuestionsService,
    private usHist: HistorialService

  ) { }

ngOnInit() {
   this.question ={
        us: this.activatedRoute.snapshot.params.us,
        id: this.activatedRoute.snapshot.params.id,
        enun: this.activatedRoute.snapshot.params.enu,
        a: this.activatedRoute.snapshot.params.a,
        b: this.activatedRoute.snapshot.params.b,
        c: this.activatedRoute.snapshot.params.c,
        d: this.activatedRoute.snapshot.params.d,
        e: this.activatedRoute.snapshot.params.e,
      corOp: this.activatedRoute.snapshot.params.res
    };
  this.pista("");
  this.option("no contestada");
  this.hist.us = this.activatedRoute.snapshot.params.us;
  this.startTimer();
  }

//guardado en el historial del usuario
putHistorial(quest){
  
  this.hist.id = quest;
  this.questHist.push(this.hist);    
  console.log("Historial pregunta:  "+JSON.stringify(this.questHist));
  var userHistorial = JSON.stringify(this.questHist);
  this.usHist.historial(userHistorial, this.question.us).subscribe(response => {
    console.log(response);
      this.message ="actualizado";
              }, error => {
            console.log(error);
          }
    );
}

//Tomar valores del historial
getHistorial(mensaje, tiempo){
    console.log("segundos: "+tiempo);
    this.hist.tiempo = tiempo;
    this.putHistorial(mensaje);
    var idNum = parseInt(mensaje);
    console.log(idNum +1 );
    this.nextQuestion(idNum+1);
}

//Opciones pregunta
option(opt){
 var res;  
 console.log(opt   + this.question['corOp']);
  if(opt == this.question['corOp']){
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

//Siguiente Pregunta     
nextQuestion(id){
   if(id%3==0){
     this.router.navigateByUrl('/poll/'+this.question['us']);
   }else{
  console.log(id);
  this.taskService.getTasks(id).subscribe(
    res  => {
          this.tasks = res;
          console.log('pasa 2: ' + this.tasks['Enunciado'])
          var r = this.tasks['Enunciado'];
          this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(()=>
          
          this.router.navigate(['/question/'+ 
          this.question['us']+'/'+
          this.tasks['ID']+'/'+
          this.tasks['Enunciado']+'/'+
          this.tasks['a']+'/'+
          this.tasks['b']+'/'+
          this.tasks['c']+'/'+encodeURI(
          this.tasks['d']+'/'+
          this.tasks['e']+'/'+          
          this.tasks['Alternativacorrecta']
          
          )]));

        },
        err => console.log(err)
      )
   }
}

 //Verificación de uso de la pista
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


//tiempo en segundos 
startTimer() {   
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
      console.log(this.display);
      if(this.display%15==0){
        window.alert("Sigues Ahí ?");
      }
    }, 1000);  
    
  }

  transform(value: number): number {
       const minutes: number = Math.floor(value);
       return minutes;
  }
   pauseTimer() {
    clearTimeout(this.interval);
  }

action(mensaje, tiempo){
  this.getHistorial(mensaje, tiempo);
  this.pauseTimer();  
}


}