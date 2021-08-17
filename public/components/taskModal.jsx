import React from 'react'
import '../stylesheets/taskModal.css'
import '../stylesheets/generalStructure.css'
import '../stylesheets/form.css'

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
          <label for="task-title">Título<span class="red-highlight">*</span></label>
          <input class="form-input" id="task-title"></input>
        </div>
        <div className="task-modal__field">
          <label for="task-description">Descrição</label>
          <textarea class="form-input large" id="message-body"></textarea>
        </div>
        <div className="task-modal__timer">
          <div class="task-modal__timer--container" id="task-timer">
            <div class="timer__options">
              <span class="timer__options--item clickable selected no-select" id="task-5minutes"
                data-time="00:05:00">5</span>
              <span class=" timer__options--item clickable no-select" id="task-25minutes" data-time="00:25:00">25</span>
              <span class="timer__options--item clickable no-select" id="task-50minutes" data-time="00:50:00">50</span>
            </div>
            <div class="timer__content">
              <div class="timer__content--item">
                <input class="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-hours"></input>
                <span class="timer-colon">:</span>
                <input class="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-minutes"></input>
                <span class="timer-colon">:</span>
                <input class="timer-input" maxlength="2" value="00" data-id="timeInput" id="task-seconds"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}