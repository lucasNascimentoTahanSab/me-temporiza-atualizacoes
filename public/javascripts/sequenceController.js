import Sequence from './sequence.js'

export default class SequenceController {
  _sequences
  _currentSequence

  constructor() {
    this._sequences = []
    this._currentSequence = 0
  }

  /**
   * @param {number} currentSequence
   */
  set currentSequence(currentSequence) {
    this._currentSequence = currentSequence
  }

  /**
   * @param {string} title
   */
  set title(title) {
    if (this._sequences.length === 0 || this._sequences.length - 1 < this._currentSequence) return
    this._sequences[this._currentSequence].title = title
  }

  /**
   * @param {string} description
   */
  set description(description) {
    if (this._sequences.length === 0 || this._sequences.length - 1 < this._currentSequence) return
    this._sequences[this._currentSequence].description = description
  }

  get sequence() {
    if (this._sequences.length === 0 || this._sequences.length - 1 < this._currentSequence) return
    return this.sequence[this._currentSequence]
  }

  createSequence() {
    this._sequences.push(new Sequence)
    this._currentSequence = this._sequences.length - 1
  }

  deleteSequence() {
    delete this.sequence[this._currentSequence]
  }

  subscribeTaskInSequence(task) {
    if (this._sequences.length === 0) this.createSequence()
    this._sequences[this._currentSequence].tasks.push(task)
  }

  isThereAnySequence() {
    return this._sequences.length > 0
  }
}