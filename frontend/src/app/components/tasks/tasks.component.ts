import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service'
import {Router}                      from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks =[];
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(
        
        res => {
          this.tasks = res;
        },
        err => console.log(err)
      )
  }

  getNavigation(link) {
    this.router.navigate([link]);
   
  }

}
