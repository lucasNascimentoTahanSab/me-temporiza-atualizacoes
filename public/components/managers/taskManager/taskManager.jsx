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
    this.state = { isTaskModalVisible: false, editCurrentTask: false }
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
      <ListItem
        id={task.id}
        title={task.title}
        description={task.description}
        time={this._taskController.getTimeFormatted(task.timer)}
        editListItem={this._editCurrentTask.bind(this)} />
    )
  }

  _taskModal() {
    return this.state.editCurrentTask
      ? <TaskModal
        createNewTask={false}
        hours={this._taskController.task.timer.initialHours}
        minutes={this._taskController.task.timer.initialMinutes}
        seconds={this._taskController.task.timer.initialSeconds}
        closeModal={this._closeTaskModal.bind(this)}
        updateTaskController={this._updateTaskController.bind(this)}
        taskController={this._taskController} />
      : <TaskModal
        createNewTask={true}
        hours={this.props.hours}
        minutes={this.props.minutes}
        seconds={this.props.seconds}
        closeModal={this._closeTaskModal.bind(this)}
        updateTaskController={this._updateTaskController.bind(this)}
        taskController={this._taskController} />
  }

  _openTaskModal() {
    this.setState({ isTaskModalVisible: true })
  }

  _closeTaskModal() {
    this.setState({ editCurrentTask: false, isTaskModalVisible: false })
  }

  _updateTaskController(taskController) {
    this._taskController = new TaskController(taskController)
    setTimeout(this._closeTaskModal.bind(this), 500)
  }

  _editCurrentTask(id) {
    this._taskController.currentTask = id
    this.setState({ editCurrentTask: true, isTaskModalVisible: true })
  }

  _closeTaskManager() {
    this.setState({ isVisible: false })
    this.props.closeTaskManager(this._taskController)
  }
}