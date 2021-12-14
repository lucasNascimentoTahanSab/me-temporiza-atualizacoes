import Task from './task.js'
import TimerController from '../timer/timerController.js'

export default class TaskController {
  _tasks
  _currentTask
  _nextIdAvailable
  _timerController

  constructor(taskController) {
    this._tasks = taskController?._tasks ?? new Map
    this._currentTask = taskController?._currentTask ?? 0
    this._nextIdAvailable = taskController?._nextIdAvailable ?? 0
    this._timerController = taskController?._timerController ?? new TimerController
  }

  /**
   * @param {string} title
   */
  set title(title) {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    this._tasks.get(this._currentTask).title = title
  }

  /**
   * @param {string} description
   */
  set description(description) {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    this._tasks.get(this._currentTask).description = description
  }

  /**
   * @param {number} currentTask
   */
  set currentTask(currentTask) {
    this._currentTask = currentTask
  }

  get task() {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    return this._tasks.get(this._currentTask)
  }

  get tasks() {
    return this._tasks.size > 0 ? Array.from(this._tasks.values()) : []
  }

  get isTitleFilled() {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    return this._tasks.get(this._currentTask).title != ''
  }

  get isTimerFilled() {
    const task = this.task
    if (!task) return false

    return task.timer.initialHours !== '00' || task.timer.initialMinutes !== '00' || task.timer.initialSeconds !== '00'
  }

  get isTaskReady() {
    return this.isTitleFilled && this.isTimerFilled
  }

  createTask() {
    const newTask = new Task(this._nextIdAvailable++)
    this._tasks.set(newTask.id, newTask)
    this._currentTask = newTask.id
  }

  deleteTask() {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    this._tasks.delete(this._currentTask)
    this._currentTask = this._tasks.keys().next().value
  }

  setTaskTimer(hours, minutes, seconds) {
    if (this._tasks.size === 0 || !this._tasks.has(this._currentTask)) return
    this._timerController.selectTimer(hours, minutes, seconds)
    this._tasks.get(this._currentTask).timer = { ...this._timerController.timer }
  }

  getTimeFormatted(timer) {
    this._timerController.selectTimer(timer.initialHours, timer.initialMinutes, timer.initialSeconds)
    return this._timerController.getTimeFormatted()
  }
}