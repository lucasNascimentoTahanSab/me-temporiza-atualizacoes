import React from 'react'
import PlayButton from './playButton.jsx'
import PauseButton from './pauseButton.jsx'
import ReloadButton from './reloadButton.jsx'
import TimerController from '../javascripts/timerController.js'
import '../stylesheets/timer.css'
import '../stylesheets/generalStructure.css'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const oneSecond = 1000

export default class TimerComponent extends React.Component {
  _timerController
  _timeFormatted
  _timeout
  _hoursInput
  _minutesInput
  _secondsInput

  constructor(props) {
    super(props)
    this._timerController = new TimerController
    this._hoursInput = React.createRef()
    this._minutesInput = React.createRef()
    this._secondsInput = React.createRef()
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      firstPresetSelected: true,
      secondPresetSelected: false,
      thirdPresetSelected: false,
      executeImage: <PlayButton></PlayButton>
    }
  }

  componentDidMount() {
    if (mobileEnvironments.test(navigator.userAgent))
      window.addEventListener('click', this._formatTimeInputs)
  }

  render() {
    return (
      <div class="timer">
        <div class="timer__options">
          <span class={"timer__options--item clickable no-select" + (this.state.firstPresetSelected ? " selected" : "")}
            data-time="00:05:00" onClick={this._handlePresetTimeSelection.bind(this)}>5</span>
          <span class={"timer__options--item clickable no-select" + (this.state.secondPresetSelected ? " selected" : "")}
            data-time="00:25:00" onClick={this._handlePresetTimeSelection.bind(this)}>25</span>
          <span class={"timer__options--item clickable no-select" + (this.state.secondPresetSelected ? " selected" : "")}
            data-time="00:50:00" onClick={this._handlePresetTimeSelection.bind(this)}>50</span>
        </div>
        <div class="timer__content">
          <div class="timer__content--item">
            <input class="timer-input" maxlength="2" value={this.state.hours} ref={this._hoursInput} data-id="timeInput"
              onKeyDown={this._handleBackspacePressed.bind(this)} onKeyDown={this._handleCustomTimeSelectionOnDesktop.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
            <span class="timer-colon">:</span>
            <input class="timer-input" maxlength="2" value={this.state.minutes} ref={this._minutesInput} data-id="timeInput"
              onKeyDown={this._handleBackspacePressed.bind(this)} onKeyDown={this._handleCustomTimeSelectionOnDesktop.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
            <span class="timer-colon">:</span>
            <input class="timer-input" maxlength="2" value={this.state.seconds} ref={this._secondsInput} data-id="timeInput"
              onKeyDown={this._handleBackspacePressed.bind(this)} onKeyDown={this._handleCustomTimeSelectionOnDesktop.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
          </div>
          <div class="timer__content--item">
            <div class="clickable no-select" onClick={this._toggleTimerMode.bind()}>
              {this.state.executeImage}
            </div>
            <div class="clickable no-select" onClick={this._reloadTimer.bind()}>
              <ReloadButton></ReloadButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Method responsible for managing the timer mode 
   * changes during user DOM manipulation. It executes 
   * when playing or pausing (when alarm is playing or not) 
   * the timer execution.
   */
  _toggleTimerMode() {
    if (this._timerController.isPlaying) return this._toggleTimerModeWhenPlaying()
    if (this._alarmIsPlaying()) return this._toggleTimerModeWhenAlarmPlaying()

    return this._toggleTimerModeWhenNotPlaying()
  }

  _toggleTimerModeWhenPlaying() {
    this._timerController.toggleTimerMode(false)
    this._changeExecuteImage()
    this._stopTimer()
  }

  _toggleTimerModeWhenAlarmPlaying() {
    this._timerController.toggleTimerMode(false)
    this._changeExecuteImage()
    this._stopAlarm()
  }

  _toggleTimerModeWhenNotPlaying() {
    this._timerController.toggleTimerMode(true)
    this._changeExecuteImage()
    this._startTimer()
  }

  _handlePresetTimeSelection(event) {
    const timeSplitted = event.target.dataset.time.split(':')
    this._selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
    this._changeTimerValueOnScreen()
    this._reloadTimer()
  }

  /**
   * Method responsible for the timer selection
   * based on hours, minutes and seconds selected.
   * Those three arguments are then attributed to the 
   * timer in timerController.
   */
  _selectTimer(hours, minutes, seconds) {
    if (hours > 23) hours = 23
    if (minutes > 59) minutes = 59
    if (seconds > 59) seconds = 59
    this._timerController.selectTimer(hours, minutes, seconds)
    this._timeFormatted = this._timerController.getTimeFormatted()
    this._updatePresetTimes()
  }

  /**
   * Method responsible por updating the preset timer
   * options when selected, hilightning the selected option
   * and removing the highlight from the others.
   */
  _updatePresetTimes() {
    let firstPresetSelected, secondPresetSelected, thirdPresetSelected = false
    switch (this._timeFormatted) {
      case '00:05:00':
        firstPresetSelected = true
        break
      case '00:25:00':
        secondPresetSelected = true
        break
      case '00:50:00':
        thirdPresetSelected = true
        break
      default:
    }

    this.setState({
      firstPresetSelected: firstPresetSelected,
      secondPresetSelected: secondPresetSelected,
      thirdPresetSelected: thirdPresetSelected
    })
  }

  _customTimeSelectionOnKeyPressed(event) {
    if (!mobileEnvironments.test(navigator.userAgent))
      this._handleCustomTimeSelectionOnDesktop(event)
  }

  _customTimeSelectionOnKeyDown(event) {
    if (this._timerController.isPlaying)
      this._toggleTimerModeWhenPlaying()
    if (!mobileEnvironments.test(navigator.userAgent))
      this._handleBackspacePressed(event)
  }

  _customTimeSelectionOnChange(event) {
    if (mobileEnvironments.test(navigator.userAgent))
      this._handleCustomTimeSelection(event)
  }

  /**
   * Method responsible for custom time selection in 
   * desktop, updating the time input without the need
   * to backspacing.
   */
  _handleCustomTimeSelectionOnDesktop(event) {
    if (event.key < '0' || event.key > '9') return false

    const characters = event.target.value.split('')
    event.target.value = characters[1] + event.key
    this._handleCustomTimeSelection()
  }

  /**
   * Method responsible for handling backspacing in custom time 
   * editing. Key code 8 is the correspondent backspace key code when 
   * handling key down and "event.preventDefault()" is needed here to 
   * avoid unexpected behavior.
   */
  _handleBackspacePressed(event) {
    if (event.keyCode !== 8) return true

    event.preventDefault()
    const characters = event.target.value.split('')
    event.target.value = characters[0] === '0' ? '00' : '0' + characters[1]
    this._handleCustomTimeSelection()
  }

  _handleCustomTimeSelection() {
    this._selectTimer(this.state.hours, this.state.minutes, this.state.seconds)
  }

  _formatTimeInputs(event) {
    if (
      event.target === this._hoursInput.current ||
      event.target === this._minutesInput.current ||
      event.target === this._secondsInput.current
    ) return

    const timeInputs = document.querySelectorAll('[data-id="timeInput"]')
    timeInputs.forEach(timeInput => {
      if (timeInput.value.length === 2) return
      timeInput.value = '0' + timeInput.value
    })
  }

  _reloadTimer() {
    this._stopTimer()
    this._timerController.reloadTimer()
    this._changeTimerValueOnScreen()
    this._changeExecuteImage()
    this._stopAlarm()
  }

  _startTimer() {
    this._timeout = setTimeout(this._countDown.bind(this), oneSecond)
  }

  _stopTimer() {
    clearTimeout(this._timeout)
  }

  /**
   * Method responsible for the timer count down
   * while there's still time to count. When it ends,
   * the timer reloads and the alarm plays.
   */
  _countDown() {
    this._updateTimer()
    if (!this._timerController.timeIsOver()) {
      this._timeout = setTimeout(this._countDown.bind(this), oneSecond)
      return
    }

    this._reloadTimer()
    this._playAlarm()
  }

  /**
   * Method responsible for keeping the DOM timer
   * up to date with the internal timer calculation.
   */
  _updateTimer() {
    this._timerController.updateTimer()
    this._changeTimerValueOnScreen()
  }

  _changeExecuteImage() {
    this.setState({ executeImage: this._timerController.isPlaying ? <PauseButton></PauseButton> : <PlayButton></PlayButton> })
  }

  _changeTimerValueOnScreen() {
    this._timeFormatted = this._timerController.getTimeFormatted()
    const timeSplitted = this._timeFormatted.split(':')
    this.setState({
      hours: timeSplitted[0],
      minutes: timeSplitted[1],
      seconds: timeSplitted[2]
    })
  }

  _alarmIsPlaying() {
    return !document.getElementById('alarm').paused
  }

  _playAlarm() {
    const alarm = document.getElementById('alarm')
    alarm.currentTime = 0
    alarm.play()
  }

  _stopAlarm() {
    const alarm = document.getElementById('alarm')
    alarm.pause()
    alarm.currentTime = 0
  }
}