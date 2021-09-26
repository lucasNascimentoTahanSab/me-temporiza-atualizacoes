import SequenceController from '../sequenceController'
import Task from '../../task/task'

const sequenceController = new SequenceController
const sequenceTitle = 'Tasks for today morning'
const sequenceDescription = 'Sequence for keeping my today morning tasks.'

test('sequences must start empty', () => {
  expect(sequenceController._sequences.length).toBe(0)
  expect(sequenceController.sequence).toBeUndefined()
})

test('current sequence must be the first one', () => {
  expect(sequenceController._currentSequence).toBe(0)
})

test('sequence title definition when there is no sequence', () => {
  expect(() => sequenceController.title = sequenceTitle).not.toThrow()
})

test('sequence description definition when there is no sequence', () => {
  expect(() => sequenceController.description = sequenceDescription).not.toThrow()
})

test('sequence timer definition when there is no sequence', () => {
  expect(() => sequenceController.subscribeTaskInSequence(new Task)).not.toThrow()
})

test('sequence creation', () => {
  sequenceController.createSequence()
  expect(sequenceController.sequence.title).toBe('')
  expect(sequenceController.sequence.description).toBe('')
  expect(sequenceController.sequence.tasks.length).toBe(0)
})

test('sequence title definition', () => {
  sequenceController.title = sequenceTitle
  expect(sequenceController.sequence.title).toBe(sequenceTitle)
})

test('sequence description definition', () => {
  sequenceController.description = sequenceDescription
  expect(sequenceController.sequence.description).toBe(sequenceDescription)
})

test('sequence timer definition', () => {
  const newTask = new Task
  sequenceController.subscribeTaskInSequence(newTask)
  expect(sequenceController.sequence.tasks[0]).toEqual(newTask)
})

test('current sequence change', () => {
  const currentSequence = sequenceController.sequence

  sequenceController.createSequence()
  expect(sequenceController._currentSequence).toBe(1)

  sequenceController.currentSequence = 0
  expect(sequenceController.sequence).toEqual(currentSequence)
})

test('sequence exclusion when there are more than one sequence', () => {
  sequenceController.deleteSequence()
  expect(sequenceController.sequence).not.toBeUndefined()
})

test('sequence exclusion when there is just one sequence', () => {
  sequenceController.deleteSequence()
  expect(sequenceController.sequence).toBeUndefined()
})