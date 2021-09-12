import React from 'react'
import Modal from './modal.jsx'
import TaskForm from './TaskForm.jsx'
import '../stylesheets/taskModal.css'

/**
 * Component responsible for keeping rendering the
 * task form inside the modal.
 */
export default class TaskModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: true }
  }

  render() {
    return (
      <div className={"task-modal-container" + (this.state.isVisible ? "" : " hide")}>
        <Modal title="Qual a boa?" firstParagraph="Separar suas atividades em tarefas menores pode te ajudar"
          secondParagraph="a gerenciar melhor seu tempo!" closeModal={this._closeModal.bind(this)}>
          <TaskForm buttonName="Salvar" setTaskTitle={this.props.setTaskTitle} setTaskDescription={this.props.setTaskDescription}
            setTaskTimer={this.props.setTaskTimer} saveTask={this.props.saveTask}></TaskForm>
        </Modal>
      </div>
    )
  }

  _closeModal() {
    this.setState({ isVisible: false })
    setTimeout(this.props.closeModal, 500)
  }
}