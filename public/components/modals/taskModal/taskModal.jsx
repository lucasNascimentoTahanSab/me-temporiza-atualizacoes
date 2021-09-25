import React from 'react'
import Modal from '../modal.jsx'
import TaskForm from './taskForm.jsx'
import '../../../stylesheets/generalStructure.css'
import '../../../stylesheets/taskModal.css'

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
          <TaskForm buttonName="Salvar" saveTask={this._saveTask.bind(this)}></TaskForm>
        </Modal>
      </div>
    )
  }

  _saveTask() {
    setTimeout(() => {
      this.setState({ isVisible: false })
      setTimeout(this.props.saveTask, 500)
    }, 1000)
  }

  _closeModal() {
    this.setState({ isVisible: false })
    setTimeout(this.props.closeModal, 500)
  }
}