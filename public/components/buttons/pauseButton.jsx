import React from 'react'
import '../../stylesheets/generalStructure.css'

export default class PauseButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <svg className="clickable" width={this.props.width ?? "30"} height={this.props.height ?? "48"} viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7857 0H0V48H11.7857V0ZM30 0H18.2143V48H30V0Z" fill={this.props.fill ?? "#741384"} />
      </svg>
    )
  }
}