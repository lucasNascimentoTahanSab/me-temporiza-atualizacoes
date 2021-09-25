/**
 * Class responsible for timers data storage.
 * This is the base class of the application, over 
 * which the whole architecture was developed, and it
 * is of extreme importance for time counting and
 * everything that comes with it.
 */
export default class Timer {
  initialHours
  initialMinutes
  initialSeconds
  currentHours
  currentMinutes
  currentSeconds
  finalTime

  constructor() {
    this.initialHours = '00'
    this.initialMinutes = '00'
    this.initialSeconds = '00'
    this.currentHours = parseInt(this.initialHours)
    this.currentMinutes = parseInt(this.initialMinutes)
    this.currentSeconds = parseInt(this.initialSeconds)
    this.finalTime = new Date
  }
}