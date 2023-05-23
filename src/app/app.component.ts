import { Component, OnInit } from '@angular/core';

interface taskObj {
  task: string,
  isCompleted: boolean

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let data=localStorage.getItem('ToDo')
    if (data) {
      this.taskArray=JSON.parse(data)
    }
  }
  title = 'ToDoApp';
  task: string = ""
  taskArray: taskObj[] = []
  editTask: boolean = false
  editIndex: number = 0
  submitted: boolean = false

  onTaskAdd(taskInput: string) {
    if (!taskInput.trim()) {
      this.submitted=true
      return
    }

    let taskObj: taskObj = {
      task: "",
      isCompleted: false
    }
    taskObj.isCompleted = false
    taskObj.task = taskInput
    this.taskArray.unshift(taskObj)
    localStorage.setItem("ToDo", JSON.stringify(this.taskArray))

    this.task = ""
    this.editTask = false
    this.submitted = false

    console.log(this.submitted,"submitted");
    

  }

  checkCompleted(index: number) {

    let temp = this.taskArray[index]
    if (!this.taskArray[index].isCompleted) {
      this.taskArray[index].isCompleted = true
      this.taskArray.splice(index, 1)
      this.taskArray[this.taskArray.length] = temp
      localStorage.setItem("ToDo", JSON.stringify(this.taskArray))


    }
    else {
      this.taskArray[index].isCompleted = false
      this.taskArray.splice(index, 1)
      this.taskArray.unshift(temp)
      localStorage.setItem("ToDo", JSON.stringify(this.taskArray))

    }

    this.editTask = false
    this.submitted = false

  }

  delete(index: number) {

    this.taskArray.splice(index, 1)
    localStorage.setItem("ToDo",JSON.stringify(this.taskArray))

    this.editTask = false
    this.submitted = false
  }
  

  edit(index: number) {
    this.task = this.taskArray[index].task
    this.editIndex = index
    this.editTask = true
    this.submitted = false

  }

  onTaskEdit(taskInput: string) {
    if (!taskInput.trim()) {
      this.submitted=true
      return
    }
    this.taskArray[this.editIndex].task = taskInput
    localStorage.setItem("ToDo",JSON.stringify(this.taskArray))

    this.task = ""
    this.editTask = false
    this.submitted = false


  }
}
