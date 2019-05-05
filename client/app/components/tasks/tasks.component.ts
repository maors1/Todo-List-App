import { Component } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task } from "../../../models/Task";

@Component({
  moduleId: module.id,
  selector: "tasks",
  templateUrl: "tasks.component.html"
})
export class TasksComponent {

  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }
  addTask(event) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: "false"
    };

    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.title = "";
      // alert("Task Added Successfuly");
    });
  }

   deleteTask(id){
    var tasks = this.tasks;
    if (confirm("Are you sure")) {
    this.taskService.deleteTask(id)
      .subscribe(data => {
        if(data.n == 1){
          for (var i =0; i<tasks.length; i++){
            if (tasks[i]._id == id){
              tasks.splice(i,1);
            }
          }
        }
        
      });
      // console.log(tasks)
    }
  }

  /* deleteTask(id) {
    var tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(task => {
      var objDeletedTask = task["d2"];
      // var index = tasks.findIndex( task => { 
      //   return task._id == objDeletedTask.id
      // });
      var index = tasks.indexOf(objDeletedTask)
      console.log(index);
      this.tasks.slice(index, 1);
      
    });
  } */

  updateStatus(task){
    /* var _task = new Task();
    _task._id = task._id;
    _task.title = task.title;
    _task.isDone = !task.isDone;
 */
var new_isdone;
if (task.isDone){
    new_isdone = false;
}
else{
    new_isdone = true;
}
var _task = {
    _id: task._id,
    title: task.title,
    isDone: new_isdone
};
    //console.log(task);
    // console.log(_task);
    this.taskService.updateStatus(_task).subscribe( data =>{
      // console.log(data);
      task.isDone = new_isdone;
      alert("Changes saved")
      // console.log(task)
    })
  }
}
