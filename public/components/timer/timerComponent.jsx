import React from 'react'
import PlayButton from '../buttons/playButton.jsx'
import PauseButton from '../buttons/pauseButton.jsx'
import ReloadButton from '../buttons/reloadButton.jsx'
import TimerController from '../../javascripts/timer/timerController.js'
import '../../stylesheets/timer.css'
import '../../stylesheets/generalStructure.css'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const oneSecond = 1000

export default class TimerComponent extends React.Component {
  _timerController
  _timeFormatted
  _timeout
  _hoursInput
  _minutesInput
  _secondsInput
  _firstPreset
  _secondPreset
  _thirdPreset
  _resetTimer

  constructor(props) {
    super(props)
    this._timerController = new TimerController
    this._hoursInput = React.createRef()
    this._minutesInput = React.createRef()
    this._secondsInput = React.createRef()
    this._firstPreset = React.createRef()
    this._secondPreset = React.createRef()
    this._thirdPreset = React.createRef()
    this._resetTimer = false
    this.state = { executionButton: <PlayButton></PlayButton> }
  }

  componentDidMount() {
    this._selectTimer('00', '05', '00')
    this._changeTimerValueOnScreen()
    $(this._hoursInput.current).keydown(this._customTimeSelectionOnKeyDown.bind(this))
    $(this._minutesInput.current).keydown(this._customTimeSelectionOnKeyDown.bind(this))
    $(this._secondsInput.current).keydown(this._customTimeSelectionOnKeyDown.bind(this))

    if (mobileEnvironments.test(navigator.userAgent)) window.addEventListener('click', this._formatTimeInputs.bind(this))
  }

  componentDidUpdate() {
    this._changeTimerValueOnScreen()
    this._updatePresetTimes()
  }

  render() {
    return (
      <div class={"timer" + (this.props.compact ? " timer--compact" : "")}>
        <div class={"timer__options" + (this.props.compact ? " timer__options--compact" : "")}>
          <span class="timer__options--item clickable no-select selected" data-time="00:05:00"
            ref={this._firstPreset} onClick={this._handlePresetTimeSelection.bind(this)}>5</span>
          <span class="timer__options--item clickable no-select" data-time="00:25:00"
            ref={this._secondPreset} onClick={this._handlePresetTimeSelection.bind(this)}>25</span>
          <span class="timer__options--item clickable no-select" data-time="00:50:00"
            ref={this._thirdPreset} onClick={this._handlePresetTimeSelection.bind(this)}>50</span>
        </div>
        <div class={"timer__content" + (this.props.compact ? " timer__content--compact" : "")}>
          <div class="timer__content--item">
            <input class="timer-input" maxlength="2" ref={this._hoursInput} onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
            <span class="timer-colon">:</span>
            <input class="timer-input" maxlength="2" ref={this._minutesInput} onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
            <span class="timer-colon">:</span>
            <input class="timer-input" maxlength="2" ref={this._secondsInput} onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)}
              onChange={this._handleCustomTimeSelection.bind(this)}></input>
          </div>
          {!this.props.compact ? this._timerButtonsSection() : null}
        </div>
      </div>
    )
  }

  _timerButtonsSection() {
    return (
      <div class="timer__content--item">
        <div class="clickable no-select" onClick={this._toggleTimerMode.bind(this)}>
          {this.state.executionButton}
        </div>
        <div class="clickable no-select" onClick={this._reloadTimer.bind(this)}>
          <ReloadButton></ReloadButton>
        </div>
      </div>
    )
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

    if ('sendTime' in this.props)
      this.props.sendTime(hours, minutes, seconds)
  }

  /**
   * Method responsible por updating the preset timer
   * options when selected, highlightning the selected option
   * and removing the highlight from the others.
   */
  _updatePresetTimes() {
    if (this._timeFormatted === this._firstPreset.current.dataset.time) this._firstPreset.current.classList.add('selected')
    else this._firstPreset.current.classList.remove('selected')

    if (this._timeFormatted === this._secondPreset.current.dataset.time) this._secondPreset.current.classList.add('selected')
    else this._secondPreset.current.classList.remove('selected')

    if (this._timeFormatted === this._thirdPreset.current.dataset.time) this._thirdPreset.current.classList.add('selected')
    else this._thirdPreset.current.classList.remove('selected')
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
    this._stopTimer()

    this._resetTimer = false
    this._changeExecuteButton()
  }

  _toggleTimerModeWhenAlarmPlaying() {
    this._timerController.toggleTimerMode(false)
    this._stopAlarm()

    this._resetTimer = false
    this._changeExecuteButton()
  }

  _toggleTimerModeWhenNotPlaying() {
    this._timerController.toggleTimerMode(true)
    this._startTimer()

    this._resetTimer = false
    this._changeExecuteButton()
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
   * updated with the internal timer calculation.
   */
  _updateTimer() {
    this._timerController.updateTimer()
    this._changeTimerValueOnScreen()
  }

  _reloadTimer() {
    this._stopTimer()
    this._timerController.reloadTimer()
    this._changeTimerValueOnScreen()
    this._stopAlarm()

    this._resetTimer = true
    this._changeExecuteButton()
  }

  _customTimeSelectionOnKeyPressed(event) {
    if (!mobileEnvironments.test(navigator.userAgent))
      this._handleCustomTimeSelectionOnDesktop(event)
  }

  _customTimeSelectionOnKeyDown(event) {
    if (!mobileEnvironments.test(navigator.userAgent)) this._handleBackspacePressed(event)
    if (this._timerController.isPlaying) this._toggleTimerModeWhenPlaying()
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
    this._selectTimer(this._hoursInput.current.value, this._minutesInput.current.value, this._secondsInput.current.value)
  }

  _formatTimeInputs(event) {
    if (
      event.target === this._hoursInput.current ||
      event.target === this._minutesInput.current ||
      event.target === this._secondsInput.current
    ) return

    if (this._hoursInput.current.value.length !== 2) this._hoursInput.current.value = '0' + this._hoursInput.current.value
    if (this._minutesInput.current.value.length !== 2) this._minutesInput.current.value = '0' + this._minutesInput.current.value
    if (this._secondsInput.current.value.length !== 2) this._secondsInput.current.value = '0' + this._secondsInput.current.value
  }

  _changeExecuteButton() {
    this.setState({ executionButton: this._timerController.isPlaying ? <PauseButton></PauseButton> : <PlayButton></PlayButton> })
  }

  _changeTimerValueOnScreen() {
    this._timeFormatted = this._timerController.getTimeFormatted()
    const timeSplitted = this._timeFormatted.split(':')
    this._hoursInput.current.value = timeSplitted[0]
    this._minutesInput.current.value = timeSplitted[1]
    this._secondsInput.current.value = timeSplitted[2]
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