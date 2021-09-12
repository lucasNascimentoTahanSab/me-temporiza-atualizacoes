import React from 'react';
import '../stylesheets/form.css'

export default class WarningInline extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      this.props.showMessage ? <span className="form-inline--warning">{this.props.message}</span> : null
    )
  }
}