import Timer from './timer.js'

export default class Task {
  title
  description
  timer

  constructor() {
    this.title = ''
    this.description = ''
    this.timer = new Timer
  }
}