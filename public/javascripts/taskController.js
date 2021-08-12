import Task from './task.js'
import TimerController from './timerController.js'

export default class TaskController {
  _task
  _timerController

  constructor() {
    this._timerController = new TimerController
  }

  /**
   * @param {string} title
   */
  set title(title) {
    this._task.title = title
  }

  /**
   * @param {string} description
   */
  set description(description) {
    this._task.description = description
  }

  get task() {
    return this._task
  }

  createTask() {
    this._task = new Task
  }

  deleteTask() {
    delete this._task
  }

  setTaskTimer(hours, minutes, seconds) {
    this._timerController.selectTimer(hours, minutes, seconds)
    this._task.timer = this._timerController.timer
  }
}