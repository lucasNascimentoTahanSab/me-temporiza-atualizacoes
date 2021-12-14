import React from 'react'

export default class EditButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <svg width={this.props.width ?? "16"} height={this.props.height ?? "16"} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.07595 20.7595L0 40L19.2405 33.924L40 13.1646L33.4177 6.58228L26.8354 0L6.07595 20.7595Z" fill={this.props.fill ?? "#741384"} />
      </svg>
    )
  }
}