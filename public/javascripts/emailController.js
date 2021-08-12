import Email from './email.js'

export default class EmailController {
  _email

  constructor() {
    this._email = new Email
  }

  /**
   * @param {string} name
   */
  set name(name) {
    if (typeof name !== 'string') return

    this._email.name = name
  }

  /**
   * @param {string} origin
   */
  set origin(origin) {
    if (typeof origin !== 'string') return

    this._email.origin = origin
  }

  /**
   * @param {string} title
   */
  set title(title) {
    if (typeof title !== 'string') return

    this._email.title = title
  }

  /**
   * @param {string} message
   */
  set message(message) {
    if (typeof message !== 'string') return

    this._email.message = message
  }

  sendEmail() { }
}