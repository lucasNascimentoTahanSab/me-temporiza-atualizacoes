import React, { Component } from 'react'
import '../stylesheets/modal.css'
import '../stylesheets/form.css'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: true }
  }

  render() {
    return (
      <div className="modal-container" id="modal-container">
        <div className="modal-body">
          <div className="modal-close" onClick={this.props.closeModal}>
            <div className="modal-close--up-line"></div>
            <div className="modal-close--down-line"></div>
          </div>
          <section className="modal-content">
            <header className="modal-title">
              <h2>{this.props.title}</h2>
              <p>{this.props.firstParagraph}</p>
              <p>{this.props.secondParagraph}</p>
            </header>
            <div className="modal-form"></div>
            <footer className="modal-footer">
              <button className="form-button">{this.props.buttonName}</button>
            </footer>
          </section>
        </div>
      </div>
    );
  }
}