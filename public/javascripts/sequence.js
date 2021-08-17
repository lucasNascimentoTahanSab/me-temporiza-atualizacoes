import Task from './task.js'

/**
 * Class responsible for sequences data storage.
 * Sequences are data structures developed for keeping
 * tasks in separation of concerns.
 */
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