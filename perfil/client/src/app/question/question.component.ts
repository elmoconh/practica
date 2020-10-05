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
  a: string,
  b: string,
  c: string,
  d: string,
  e: string
 };

  constructor(    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.question ={
        id: this.activatedRoute.snapshot.params.id,
        a: this.activatedRoute.snapshot.params.a,
        b: this.activatedRoute.snapshot.params.b,
        c: this.activatedRoute.snapshot.params.c,
        d: this.activatedRoute.snapshot.params.d,
        e: this.activatedRoute.snapshot.params.e,

    };
  }


 
}
