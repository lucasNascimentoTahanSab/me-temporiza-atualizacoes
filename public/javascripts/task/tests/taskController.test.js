import TaskController from '../taskController'
import Task from '../task'

const taskController = new TaskController
const taskTitle = 'Yoga'
const taskDescription = '30 minutes of a wonderfull experience...'
const taskInitialHours = '00'
const taskInitialMinutes = '30'
const taskInitialSeconds = '00'

test('tasks must start empty', () => {
  expect(taskController._tasks.length).toBe(0)
})

test('current task must be the first one', () => {
  expect(taskController._currentTask).toBe(0)
})

test('task title definition when there is no task', () => {
  expect(() => taskController.title = taskTitle).not.toThrow()
})

test('task description definition when there is no task', () => {
  expect(() => taskController.description = taskDescription).not.toThrow()
})

test('task timer definition when there is no task', () => {
  expect(() => taskController.setTaskTimer(taskInitialHours, taskInitialMinutes, taskInitialSeconds)).not.toThrow()
})

test('delete task when there is no task', () => {
  expect(() => taskController.deleteTask()).not.toThrow()
})

test('get task when there is no task', () => {
  expect(taskController.task).toBeUndefined()
})

test('is title filled when there is no task?', () => {
  expect(taskController.isTitleFilled).toBeFalsy()
})

test('is timer filled when there is no task?', () => {
  expect(taskController.isTimerFilled).toBeFalsy()
})

test('is task ready when there is no task?', () => {
  expect(taskController.isTaskReady).toBeFalsy()
})

test('task creation', () => {
  taskController.createTask()
  expect(taskController.task.title).toBe('')
  expect(taskController.task.description).toBe('')
  expect(taskController.task.timer).not.toBeUndefined()
})

test('task title definition', () => {
  taskController.title = taskTitle
  expect(taskController.task.title).toBe(taskTitle)
})

test('task description definition', () => {
  taskController.description = taskDescription
  expect(taskController.task.description).toBe(taskDescription)
})

test('timer is not filled', () => {
  expect(taskController.isTimerFilled).toBeFalsy()
})

test('task timer definition', () => {
  taskController.setTaskTimer(taskInitialHours, taskInitialMinutes, taskInitialSeconds)
  expect(taskController.task.timer.initialHours).toBe(taskInitialHours)
  expect(taskController.task.timer.initialMinutes).toBe(taskInitialMinutes)
  expect(taskController.task.timer.initialSeconds).toBe(taskInitialSeconds)
})

test('is title filled?', () => {
  expect(taskController.isTitleFilled).toBeTruthy()
})

test('is timer filled?', () => {
  expect(taskController.isTimerFilled).toBeTruthy()
})

test('is task ready?', () => {
  expect(taskController.isTaskReady).toBeTruthy()
})

test('current task change', () => {
  const currentTask = taskController.task

  taskController.subscribeTaskInTasks(currentTask)
  expect(taskController._currentTask).toBe(1)

  taskController.currentTask = 0
  expect(taskController.task).toEqual(currentTask)
})

test('delete task when there is more than one task', () => {
  taskController.deleteTask()
  expect(taskController.task).not.toBeUndefined()
})

test('delete task when there is just one task', () => {
  taskController.deleteTask()
  expect(taskController.task).toBeUndefined()
})