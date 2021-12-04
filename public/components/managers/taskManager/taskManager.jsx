import React from 'react'
import Toolbar from '../../toolbars/toolbar.jsx'
import '../../../stylesheets/generalStructure.css'
import '../../../stylesheets/taskManager.css'

export default class TaskManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: true }
  }

  render() {
    return (
      <div className={"task-manager-container" + (this.state.isVisible ? "" : " hide")}>
        <div className="task-manager__body">
          <Toolbar></Toolbar>
        </div>
      </div>
    )
  }

  _saveTask() {
    setTimeout(() => {
      this.setState({ isVisible: false })
      setTimeout(this.props.saveTask, 500)
    }, 1000)
  }

  _closeTaskManager() {
    this.setState({ isVisible: false })
    setTimeout(this.props.closeModal, 500)
  }
}