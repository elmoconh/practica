import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthenticationService, UserDetails } from "../authentication.service";
import { QuestionsService} from "../questions.service";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
   user:string;
   details: UserDetails;
   tasks ={id: String, en: String};

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService, 
    private router:Router,
        private taskService: QuestionsService


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
