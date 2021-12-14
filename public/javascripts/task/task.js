import Timer from '../timer/timer.js'

/**
 * Class responsible for tasks data storage.
 * Tasks are data structures developed for keeping
 * daily users tasks they want to register in the
 * platform, allowing them to execute multiple
 * tasks inside of sequences.
 */
export default class Task {
  id
  title
  description
  timer

  constructor(id) {
    this.id = id ?? 0
    this.title = ''
    this.description = ''
    this.timer = new Timer
  }
}