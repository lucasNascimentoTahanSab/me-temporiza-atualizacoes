import Task from './task.js'

export default class Sequence {
  title
  description
  tasks

  constructor() {
    this.title = ''
    this.description = ''
    this.tasks = [new Task]
  }
}