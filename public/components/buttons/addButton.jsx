import React from 'react'
import '../../stylesheets/button.css'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button className="button button--add no-select" onClick={this._executeAction.bind(this)}>
        <strong>+</strong>
      </button>
    )
  }

  _executeAction() {
    this.props.action()
  }
}