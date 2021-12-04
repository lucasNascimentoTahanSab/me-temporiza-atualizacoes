import React from 'react'
import '../../stylesheets/button.css'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="button button--add no-select">
        <strong>+</strong>
      </div>
    )
  }
}