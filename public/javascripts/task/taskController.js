import Task from './task.js'
import TimerController from '../timer/timerController.js'

export default class TaskController {
  _tasks
  _currentTask
  _timerController

  constructor(taskController) {
    this._tasks = taskController?._tasks ?? []
    this._currentTask = taskController?._currentTask ?? 0
    this._timerController = taskController?._timerController ?? new TimerController
  }

  /**
   * @param {string} title
   */
  set title(title) {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return
    this._tasks[this._currentTask].title = title
  }

  /**
   * @param {string} description
   */
  set description(description) {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return
    this._tasks[this._currentTask].description = description
  }

  /**
   * @param {number} currentTask
   */
  set currentTask(currentTask) {
    this._currentTask = currentTask
  }

  get task() {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return
    return this._tasks[this._currentTask]
  }

  get isTitleFilled() {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return false
    return this._tasks[this._currentTask].title != ''
  }

  get isTimerFilled() {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return false
    return this._tasks[this._currentTask].timer.initialHours !== '00' ||
      this._tasks[this._currentTask].timer.initialMinutes !== '00' ||
      this._tasks[this._currentTask].timer.initialSeconds !== '00'
  }

  get isTaskReady() {
    return this.isTitleFilled && this.isTimerFilled
  }

  createTask() {
    this._tasks.push(new Task)
    this._currentTask = this._tasks.length - 1
  }

  subscribeTaskInTasks(task) {
    this._tasks.push(task)
    this._currentTask = this._tasks.length - 1
  }

  deleteTask() {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return
    this._tasks.splice(this._currentTask, 1)
  }

  setTaskTimer(hours, minutes, seconds) {
    if (this._tasks.length === 0 || this._tasks.length - 1 < this._currentTask) return
    this._timerController.selectTimer(hours, minutes, seconds)
    this._tasks[this._currentTask].timer = this._timerController.timer
  }
}