import React from 'react'
import '../stylesheets/form.css'
import '../stylesheets/generalStructure.css'
import '../stylesheets/modal.css'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: true }
  }

  render() {
    return (
      <div className={"modal-body" + (this.state.isVisible ? "" : " hide")}>
        <div className="modal-close" onClick={this._closeModal.bind(this)}>
          <div className="close-button--up-line"></div>
          <div className="close-button--down-line"></div>
        </div>
        <section className="modal-content">
          <header>
            <h2 className="modal-title">{this.props.title}</h2>
            <p>{this.props.firstParagraph}</p>
            <p>{this.props.secondParagraph}</p>
          </header>
          {this.props.children}
        </section>
      </div>
    )
  }

  _closeModal() {
    this.setState({ isVisible: false })
    this.props.closeModal()
  }
}