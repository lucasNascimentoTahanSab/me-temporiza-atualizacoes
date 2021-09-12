import React from 'react'
import TaskController from '../javascripts/taskController.js'
import '../stylesheets/form.css'
import '../stylesheets/generalStructure.css'
import '../stylesheets/taskForm.css'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

/**
 * Component responsible for keeping the task form
 * isolated from the modal component.
 */
export default class TaskForm extends React.Component {
  _timeFormatted
  _taskController

  constructor(props) {
    super(props)
    this._taskController = new TaskController
  }

  componentDidMount() {
    this._selectTimer('00', '05', '00')
    this._changeTimerValueOnScreen()
  }

  render() {
    this._createTask()

    return (
      <div className="task-form">
        <div className="task-form-container">
          <div className="task-form__field">
            <label className="form-input--label" for="task-title">Título<span className="red-highlight">*</span></label>
            <input className="form-input" id="task-title" onChange={this._setTaskTitle.bind(this)}></input>
          </div>
          <div className="task-form__field">
            <label className="form-input--label" for="task-description">Descrição</label>
            <textarea className="form-input large" id="message-body" onChange={this._setTaskDescription.bind(this)}></textarea>
          </div>
          <div className="task-form__timer">
            <div className="task-form__timer--container" id="task-timer">
              <div className="task-form__timer-options">
                <span className="task-timer__options--item clickable selected no-select" id="task-5minutes"
                  data-time="00:05:00" onClick={this._handlePresetTimeSelection.bind(this)}>5</span>
                <span className="task-timer__options--item clickable no-select" id="task-25minutes"
                  data-time="00:25:00" onClick={this._handlePresetTimeSelection.bind(this)}>25</span>
                <span className="task-timer__options--item clickable no-select" id="task-50minutes"
                  data-time="00:50:00" onClick={this._handlePresetTimeSelection.bind(this)}>50</span>
              </div>
              <div className="task-form__timer-content">
                <div className="timer__content--item">
                  <input className="timer-input" maxlength="2" value="00" data-id="taskTimeInput" id="task-hours"
                    onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)} onKeyDow={this._customTimeSelectionOnKeyDown.bind(this)}
                    onChange={this._customTimeSelectionOnChange.bind(this)}></input>
                  <span className="timer-colon">:</span>
                  <input className="timer-input" maxlength="2" value="00" data-id="taskTimeInput" id="task-minutes"
                    onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)} onKeyDow={this._customTimeSelectionOnKeyDown.bind(this)}
                    onChange={this._customTimeSelectionOnChange.bind(this)}></input>
                  <span className="timer-colon">:</span>
                  <input className="timer-input" maxlength="2" value="00" data-id="taskTimeInput" id="task-seconds"
                    onKeyPress={this._customTimeSelectionOnKeyPressed.bind(this)} onKeyDow={this._customTimeSelectionOnKeyDown.bind(this)}
                    onChange={this._customTimeSelectionOnChange.bind(this)} ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="task-form__footer">
          <button className="form-button" onClick={this._saveTask.bind(this)}>{this.props.buttonName}</button>
        </footer>
      </div>
    )
  }

  _createTask() {
    this._taskController.createTask()
  }

  _setTaskTitle(event) {
    this._taskController.title = event.target.value
  }

  _setTaskDescription(event) {
    this._taskController.description = event.target.value
  }

  _setTaskTimer() {
    const timeSplitted = this._timeFormatted.split(':')
    this._taskController.setTaskTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  }

  _saveTask() {
    this._setTaskTimer()
    if (this._taskController.isTaskReady()) this.props.saveTask(this._taskController.task)
  }

  _handlePresetTimeSelection(event) {
    const timeSplitted = event.target.dataset.time.split(':')
    this._selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
    this._changeTimerValueOnScreen()
  }

  _changeTimerValueOnScreen() {
    const timeSplitted = this._timeFormatted.split(':')
    document.getElementById('task-hours').value = timeSplitted[0]
    document.getElementById('task-minutes').value = timeSplitted[1]
    document.getElementById('task-seconds').value = timeSplitted[2]
  }

  _customTimeSelectionOnKeyPressed(event) {
    if (!mobileEnvironments.test(navigator.userAgent))
      this._handleCustomTimeSelection(event)
  }

  _customTimeSelectionOnKeyDown(event) {
    if (!mobileEnvironments.test(navigator.userAgent))
      this._handleBackspacePressed(event)
  }

  _customTimeSelectionOnChange(event) {
    if (mobileEnvironments.test(navigator.userAgent))
      this._formatTimeInputs(event)
  }

  _handleCustomTimeSelection(event) {
    if (event.key < '0' || event.key > '9') return false

    const characters = event.target.value.split('')
    event.target.value = characters[1] + event.key
    const timeSplitted = [
      document.getElementById('task-hours').value,
      document.getElementById('task-minutes').value,
      document.getElementById('task-seconds').value
    ]
    this._selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  }

  _handleBackspacePressed(event) {
    if (event.keyCode !== 8) return true

    event.preventDefault()
    const characters = event.target.value.split('')
    event.target.value = characters[0] === '0' ? '00' : '0' + characters[1]
    const timeSplitted = [
      document.getElementById('task-hours').value,
      document.getElementById('task-minutes').value,
      document.getElementById('task-seconds').value
    ]
    this._selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  }

  _formatTimeInputs(event) {
    if (event.target.id === 'task-hours' || event.target.id === 'task-minutes' || event.target.id === 'task-seconds') return

    const timeInputs = document.querySelectorAll('[data-id="taskTimeInput"]')
    timeInputs.forEach(timeInput => {
      if (timeInput.value.length === 2) return
      timeInput.value = '0' + timeInput.value
    })
    this._selectTimer(timeInputs[0].value, timeInputs[1].value, timeInputs[2].value)
  }

  _selectTimer(hours, minutes, seconds) {
    if (hours > 23) hours = 23
    if (minutes > 59) minutes = 59
    if (seconds > 59) seconds = 59
    this._timeFormatted = hours + ':' + minutes + ':' + seconds
    this._updatePresetTimes()
  }

  _updatePresetTimes() {
    const optionItems = document.querySelectorAll('.task-timer__options--item')
    optionItems.forEach(option => {
      if (option.dataset.time === this._timeFormatted) option.classList.add('selected')
      else option.classList.remove('selected')
    })
  }
}