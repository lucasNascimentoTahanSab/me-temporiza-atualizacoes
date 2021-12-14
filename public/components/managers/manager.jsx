import React from 'react'
import Toolbar from '../toolbars/toolbar.jsx'
import '../../stylesheets/generalStructure.css'
import '../../stylesheets/manager.css'

export default class Manager extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: true }
  }

  render() {
    return (
      <div className={"manager-container" + (this.state.isVisible ? "" : " hide")}>
        <div className="manager__body">
          <Toolbar openModal={this.props.openModal}></Toolbar>
          <div className="manager__items">
            {this.props.getItems()}
          </div>
        </div>
      </div>
    )
  }

  _closeManager() {
    this.setState({ isVisible: false })
    setTimeout(this.props.closeManager, 500)
  }
}