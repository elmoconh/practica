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

  privateTasks = [];
  constructor(
    private taskService: TaskService, 
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
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
