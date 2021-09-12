import Task from './task.js'
import TimerController from './timerController.js'

export default class TaskController {
  _tasks
  _currentTask
  _timerController

  constructor() {
    this._tasks = []
    this._currentTask = 0
    this._timerController = new TimerController
  }

  /**
   * @param {string} title
   */
  set title(title) {
    this._tasks[this._currentTask].title = title
  }

  /**
   * @param {string} description
   */
  set description(description) {
    this._tasks[this._currentTask].description = description
  }

  get task() {
    return this._tasks[this._currentTask]
  }

  createTask() {
    this._tasks.push(new Task)
    this._currentTask = this._tasks.length - 1
  }

  deleteTask() {
    delete this._tasks[this._currentTask]
  }

  setTaskTimer(hours, minutes, seconds) {
    this._timerController.selectTimer(hours, minutes, seconds)
    this._tasks[this._currentTask].timer = this._timerController.timer
  }

  subscribeTaskInTasks(task) {
    this._tasks.push(task)
  }

  isTaskReady() {
    return this._tasks[this._currentTask].title && (
      this._tasks[this._currentTask].timer.initialHours &&
      this._tasks[this._currentTask].timer.initialMinutes &&
      this._tasks[this._currentTask].timer.initialSeconds
    )
  }
}