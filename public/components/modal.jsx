import React, { Component } from 'react'
import '../stylesheets/modal.css'
import '../stylesheets/form.css'

export default class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-close">
            <div className="modal-close--up-line"></div>
            <div className="modal-close--down-line"></div>
          </div>
          <section className="modal-content">
            <header className="modal-title">
              <h2>{this.props.title}</h2>
              <p>{this.props.firstparagraph}</p>
              <p>{this.props.secondparagraph}</p>
            </header>
            <div className="modal-form"></div>
            <footer className="modal-footer">
              <button className="form-button">{this.props.buttonname}</button>
            </footer>
          </section>
        </div>
      </div>
    );
  }
}