import Timer from './timer.js'

/**
 * Class responsible for tasks data storage.
 * Tasks are data structures developed for keeping
 * daily users tasks they want to register in the
 * platform, allowing them to execute multiple
 * tasks inside of sequences.
 */
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