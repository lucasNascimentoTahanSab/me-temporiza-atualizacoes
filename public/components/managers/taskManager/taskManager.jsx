import React from 'react'
import TaskModal from '../../modals/taskModal/taskModal.jsx'
import ListItem from '../../listItem.jsx'
import Manager from '../manager.jsx'
import TaskController from '../../../javascripts/task/taskController.js'
import '../../../stylesheets/generalStructure.css'

export default class TaskManager extends React.Component {
  _taskController
  _timerController

  constructor(props) {
    super(props)
    this.state = { isTaskModalVisible: false }
    this._taskController = new TaskController(this.props.taskController)
  }

  render() {
    return (
      <div>
        <Manager openModal={this._openTaskModal.bind(this)} getItems={this._tasks.bind(this)} closeManager={this._closeTaskManager.bind(this)} />
        {this.state.isTaskModalVisible ? this._taskModal() : null}
      </div>
    )
  }

  _tasks() {
    return this._taskController.tasks?.map(task =>
      <ListItem title={task.title} description={task.description} time={this._taskController.getTimeFormatted(task.timer)} />
    )
  }

  _taskModal() {
    return <TaskModal closeModal={this._closeTaskModal.bind(this)} saveTask={this._saveTask.bind(this)} />
  }

  _openTaskModal() {
    this.setState({ isTaskModalVisible: true })
  }

  _closeTaskModal() {
    this.setState({ isTaskModalVisible: false })
  }

  _saveTask(task) {
    setTimeout(() => {
      this.props.taskController.subscribeTaskInTasks(task)
      setTimeout(this._closeTaskModal.bind(this), 500)
    }, 1000)
  }

  _closeTaskManager() {
    this.setState({ isVisible: false })
    this.props.closeTaskManager(this._taskController)
  }
}