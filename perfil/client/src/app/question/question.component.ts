import { Component, OnInit } from '@angular/core';
import {Router}              from '@angular/router';
import { QuestionsService} from "../questions.service";
import { ActivatedRoute } from '@angular/router';

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
  tasks ={id: String};
  cont =0;
  constructor(    
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private taskService: QuestionsService
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

  }



getHistorial(mensaje){
    console.log(mensaje);
    if(mensaje== "00001"){
        this.nextQuestion("00002");
    }else{
        this.nextQuestion("00003");

      }
    }
      
async nextQuestion(id){
  this.taskService.getTasks(id).subscribe(
    res  => {
          this.tasks = res;
          console.log('pasa 2: ' + this.tasks['Enunciado'])
          var r = this.tasks['Enunciado'];
         // this.router.navigate(['/question/'+ this.tasks['ID']]);
          //this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/profile', {skipLocationChange: true}).then(()=>this.router.navigate(['/question/'+ 
          this.tasks['ID']+'/'+
          this.tasks['Enunciado']+'/'+
          this.tasks['a']+'/'+
          this.tasks['b']+'/'+
          this.tasks['c']+'/'+
          this.tasks['d']+'/'+
          this.tasks['e']]));

        },
        err => console.log(err)
      )


 }
        
  


}
