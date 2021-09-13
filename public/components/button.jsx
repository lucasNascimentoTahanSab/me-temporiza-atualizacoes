import React from 'react'
import '../stylesheets/form.css'
import '../stylesheets/generalStructure.css'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStandard: true,
      isSuccess: false
    }
  }

  render() {
    return this.state.isStandard ? this._standardButton() :
      this.state.isSuccess ? this._successButton() :
        this._errorButton()
  }

  _standardButton() {
    return (
      <button className="form-button no-select" onClick={this._handleClick.bind(this)}>{this.props.buttonName}</button>
    );
  }

  _successButton() {
    return (
      <button className="form-button form-button--success no-select">
        &#10003;
      </button>
    );
  }

  _errorButton() {
    setTimeout(this._returnToStandardButton.bind(this), 1000)

    return (
      <button className="form-button form-button--error no-select" onClick={this._handleClick.bind(this)}>
        <div className="close-button--up-line close-button--lighter close-button--larger"></div>
        <div className="close-button--down-line close-button--lighter close-button--larger"></div>
      </button>
    );
  }

  _returnToStandardButton() {
    this.setState({ isStandard: true })
  }

  _handleClick() {
    this.props.confirm(this._handleConfirmationResult.bind(this))
  }

  _handleConfirmationResult(result) {
    if (result) this.setState({ isStandard: false, isSuccess: true })
    else this.setState({ isStandard: false, isSuccess: false })
  }
}