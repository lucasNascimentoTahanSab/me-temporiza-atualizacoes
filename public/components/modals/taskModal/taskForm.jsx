import React from 'react'
import Button from '../../buttons/button.jsx'
import TimerComponent from '../../timer/timerComponent.jsx'
import TaskController from '../../../javascripts/task/taskController.js'
import '../../../stylesheets/form.css'
import '../../../stylesheets/generalStructure.css'
import '../../../stylesheets/taskForm.css'

/**
 * Component responsible for keeping the task form
 * isolated from the modal component.
 */
export default class TaskForm extends React.Component {
  _taskController
  _title
  _description
  _componentDidMount

  constructor(props) {
    super(props)
    this._taskController = new TaskController
    this._title = ''
    this._description = ''
    this._componentDidMount = false
    this.state = {
      showRequiredTitle: false,
      showRequiredTimer: false
    }
  }

  componentDidMount() {
    this._componentDidMount = true
  }

  render() {
    if (!this._componentDidMount) this._createTask()

    return (
      <div className="task-form">
        <div className="task-form-container">
          <div className="task-form__field">
            <label className="form-input--label" for="task-title">Título<span className="red-highlight">*</span></label>
            <input className="form-input" id="task-title" onChange={this._setTaskTitle.bind(this)}></input>
            {this._getInlineWarningIf(this.state.showRequiredTitle, '*Dê um nome para a tarefa antes de salvar')}
          </div>
          <div className="task-form__field">
            <label className="form-input--label" for="task-description">Descrição</label>
            <textarea className="form-input large" id="message-body" onChange={this._setTaskDescription.bind(this)}></textarea>
          </div>
          <div>
            <TimerComponent compact={true} sendTime={this._setTaskTimer.bind(this)}></TimerComponent>
            {this._getInlineWarningIf(this.state.showRequiredTimer, '*Dê um tempo para a tarefa antes de salvar')}
          </div>
        </div>
        <footer className="task-form__footer">
          <Button buttonName={this.props.buttonName} confirm={this._saveTask.bind(this)}></Button>
        </footer>
      </div>
    )
  }

  _createTask() {
    this._taskController.createTask()
  }

  _setTaskTitle(event) {
    this._taskController.title = event.target.value
    if (this.state.showRequiredTitle && this._taskController.isTitleFilled)
      this.setState({ showRequiredTitle: false })
  }

  _setTaskDescription(event) {
    this._taskController.description = event.target.value
  }

  _setTaskTimer(hours, minutes, seconds) {
    this._taskController.setTaskTimer(hours, minutes, seconds)
    if (this.state.showRequiredTimer && this._taskController.isTimerFilled)
      this.setState({ showRequiredTimer: false })
  }

  _saveTask(updateButtonResult) {
    if (this._taskController.isTaskReady) {
      updateButtonResult(true)
      this.props.saveTask(this._taskController.task)
    } else {
      this._showRequiredWarningsForUnfilledFields()
      updateButtonResult(false)
    }
  }

  _showRequiredWarningsForUnfilledFields() {
    this.setState({
      showRequiredTitle: !this._taskController.isTitleFilled,
      showRequiredTimer: !this._taskController.isTimerFilled
    })
  }

  _getInlineWarningIf(condition, message) {
    if (!condition) return;

    return <span className="form-inline--warning">{message}</span>
  }
}