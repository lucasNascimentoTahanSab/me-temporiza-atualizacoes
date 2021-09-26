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
    return this._sequences[this._currentSequence]
  }

  createSequence() {
    this._sequences.push(new Sequence)
    this._currentSequence = this._sequences.length - 1
  }

  deleteSequence() {
    this._sequences.splice(this._currentSequence, 1)
  }

  subscribeTaskInSequence(task) {
    if (this._sequences.length === 0 || this._sequences.length - 1 < this._currentSequence) return
    this._sequences[this._currentSequence].tasks.push(task)
  }
}