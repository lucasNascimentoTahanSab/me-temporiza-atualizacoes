import React from 'react'
import '../stylesheets/form.css'
import '../stylesheets/generalStructure.css'
import '../stylesheets/modal.css'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isNotVisible: '' }
  }

  componentDidMount() {
    this.setState({ isNotVisible: '' })
  }

  componentWillUnmount() {
    this.setState({ isNotVisible: 'task-modal--hidden' })
  }

  render() {
    return (
      <div className={"modal-container " + this.state.isNotVisible} id="modal-container">
        <div className="modal-body">
          <div className="modal-close" onClick={this.props.closeModal.bind(this)}>
            <div className="close-button--up-line"></div>
            <div className="close-button--down-line"></div>
          </div>
          <section className="modal-content">
            <header>
              <h2 className="modal-title">{this.props.title}</h2>
              <p>{this.props.firstParagraph}</p>
              <p>{this.props.secondParagraph}</p>
            </header>
            {this.props.modalContent}
          </section>
        </div>
      </div>
    )
  }
}