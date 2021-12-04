import React from 'react'
import Toolbar from '../../toolbars/toolbar.jsx'
import TaskModal from '../../modals/taskModal/taskModal'
import TaskController from '../../../javascripts/task/taskController.js'
import '../../../stylesheets/generalStructure.css'
import '../../../stylesheets/taskManager.css'

export default class TaskManager extends React.Component {
  _taskController

  constructor(props) {
    super(props)
    this.state = { isVisible: true, isTaskModalVisible: false }
    this._taskController = new TaskController(this.props.taskController)
  }

  render() {
    return (
      <div className={"task-manager-container" + (this.state.isVisible ? "" : " hide")}>
        <div className="task-manager__body">
          <Toolbar openTaskModal={this._openTaskModal.bind(this)}></Toolbar>
        </div>
        {this.state.isTaskModalVisible ? this._taskModal() : null}
      </div>
    )
  }

  _taskModal() {
    return <TaskModal closeModal={this._closeTaskModal.bind(this)} saveTask={this._saveTask.bind(this)} />
  }

  _saveTask(task) {
    setTimeout(() => {
      this.setState({ isTaskModalVisible: false })
      this.props.taskController.subscribeTaskInTasks(task)
      setTimeout(this._closeTaskModal, 500)
    }, 1000)
  }

  _openTaskModal() {
    this.setState({ isTaskModalVisible: true })
  }

  _closeTaskModal() {
    this.setState({ isTaskModalVisible: false })
  }

  _closeTaskManager() {
    this.setState({ isVisible: false })
    setTimeout(this.props.closeTaskManager(this._taskController), 500)
  }
}