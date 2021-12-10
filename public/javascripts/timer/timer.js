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

  constructor(timer) {
    this.initialHours = timer?.initialHours ?? '00'
    this.initialMinutes = timer?.initialMinutes ?? '00'
    this.initialSeconds = timer?.initialSeconds ?? '00'
    this.currentHours = timer?.currentHours ?? parseInt(this.initialHours)
    this.currentMinutes = timer?.currentMinutes ?? parseInt(this.initialMinutes)
    this.currentSeconds = timer?.currentSeconds ?? parseInt(this.initialSeconds)
    this.finalTime = timer?.finalTime ?? new Date
  }
}