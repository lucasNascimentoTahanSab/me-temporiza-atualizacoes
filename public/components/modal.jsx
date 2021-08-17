import React from 'react'
import '../stylesheets/modal.css'
import '../stylesheets/form.css'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
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
            <header>
              <h2>{this.props.title}</h2>
              <p>{this.props.firstParagraph}</p>
              <p>{this.props.secondParagraph}</p>
            </header>
            {this.props.children}
            <footer className="modal-footer">
              <button className="form-button">{this.props.buttonName}</button>
            </footer>
          </section>
        </div>
      </div>
    );
  }
}