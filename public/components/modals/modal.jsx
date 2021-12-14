import React from 'react'
import '../../stylesheets/form.css'
import '../../stylesheets/generalStructure.css'
import '../../stylesheets/modal.css'

export default class Modal extends React.Component {
  _modal
  _instanceOfCloseModalWhenClickingOut

  constructor(props) {
    super(props)
    this._modal = React.createRef()
    this._instanceOfCloseModalWhenClickingOut = this._closeModalWhenClickingOut.bind(this)
    this.state = { isVisible: true }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._instanceOfCloseModalWhenClickingOut)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._instanceOfCloseModalWhenClickingOut)
  }

  render() {
    return (
      <div className={"modal-body" + (this.state.isVisible ? "" : " hide")} ref={this._modal}>
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

  _closeModalWhenClickingOut(event) {
    if (this._modal.current.contains(event.target)) return

    this._closeModal()
  }

  _closeModal() {
    this.setState({ isVisible: false })
    this.props.closeModal()
  }
}