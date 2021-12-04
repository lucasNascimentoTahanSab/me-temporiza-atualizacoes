import React from 'react'
import AddButton from '../buttons/addButton.jsx'
import '../../stylesheets/form.css'
import '../../stylesheets/toolbar.css'
import '../../stylesheets/generalStructure.css'

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="toolbar-container">
        <div className="toolbar__items">
          <div></div>
          <div className="fill-halfly">
            <input className="form-input" id="task-search"></input>
          </div>
          <div>
            <AddButton></AddButton>
          </div>
        </div>
      </div>
    )
  }
}