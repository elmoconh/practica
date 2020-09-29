import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {
  user : {id: string};
  privateTasks = [];
  constructor(
    private taskService: TaskService, 
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.user = {
      id: this.activatedRoute.snapshot.params.id
    };
    this.taskService.getPrivateTasks()
      .subscribe(
        res => this.privateTasks = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }

}
