import React from 'react'
import '../stylesheets/form.css'
import '../stylesheets/generalStructure.css'
import '../stylesheets/taskModal.css'

/**
 * Component responsible for keeping the task creater
 * modal struture for use as the modal component
 * content.
 */
export default class TaskModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="task-modal-container">
        <div className="task-modal__field">
          <label className="form-input--label" for="task-title">Título<span className="red-highlight">*</span></label>
          <input className="form-input" id="task-title"></input>
        </div>
        <div className="task-modal__field">
          <label className="form-input--label" for="task-description">Descrição</label>
          <textarea className="form-input large" id="message-body"></textarea>
        </div>
        <div className="task-modal__timer">
          <div className="task-modal__timer--container" id="task-timer">
            <div className="timer__options">
              <span className="timer__options--item clickable selected no-select" id="task-5minutes"
                data-time="00:05:00">5</span>
              <span className=" timer__options--item clickable no-select" id="task-25minutes" data-time="00:25:00">25</span>
              <span className="timer__options--item clickable no-select" id="task-50minutes" data-time="00:50:00">50</span>
            </div>
            <div className="timer__content">
              <div className="timer__content--item">
                <input className="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-hours"></input>
                <span className="timer-colon">:</span>
                <input className="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-minutes"></input>
                <span className="timer-colon">:</span>
                <input className="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-seconds"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}