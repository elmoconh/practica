import { Component, OnInit } from '@angular/core';
import {Poll} from './poll';
import { HistorialService } from "../historial.service";
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
   coment;
   student:{user:string};
   opinion:Array<Poll>=[]
   hist = new Poll();
  constructor(
     private usOpinion : HistorialService,
     private activatedRoute: ActivatedRoute,
) { }
      
  ngOnInit(): void {
    this.coment=" ";
    this.student={user: this.activatedRoute.snapshot.params.us};
  }
  
 getOpinion(option){
   var opt;
   var com=this.coment;
   console.log(option);
  if(option=="bad"){
    opt = "bad"
    this.hist.option = opt;  

  }
  if(option=="good"){
    this.hist.option = opt;
  }
  if(option=="regular"){
    this.hist.option = opt;
  }
  console.log(com);
  this.hist.comment = this.coment;
  }

message = '';
saveOpinion(){ 
this.opinion.push( this.hist);
console.log(JSON.stringify(this.opinion));
  this.usOpinion.historial(JSON.stringify(this.opinion), this.student).subscribe(response => {
    console.log(response);
      this.message ="actualizado";
              }, error => {
            console.log(error);
          }
    );
}

redirectTo(){

}


}