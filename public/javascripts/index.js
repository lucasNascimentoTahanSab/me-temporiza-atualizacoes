import React from 'react'
import ReactDOM from 'react-dom'
import TaskModal from '../components/taskModal'
import TimerController from './timerController.js'
import TaskController from './taskController.js'
import SequenceController from './sequenceController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const desktop = './public/javascripts/desktop.js'
const mobile = './public/javascripts/mobile.js'

const timerController = new TimerController
const taskController = new TaskController
const sequenceController = new SequenceController

const oneSecond = 1000
let timeFormatted
let timeout

window.addEventListener('load', () => {
  selectTimer('00', '05', '00')
  changeTimerValueOnScreen()
  document.getElementById('execute').addEventListener('click', toggleTimerMode)
  document.getElementById('reload').addEventListener('click', reloadTimer)
  document.getElementById('hours').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('minutes').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('seconds').addEventListener('keydown', () => { if (timerController.isPlaying) toggleTimerModeWhenPlaying() })
  document.getElementById('5minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('25minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('50minutes').addEventListener('click', handlePresetTimeSelection)
  document.getElementById('alarm').addEventListener('pause', reloadTimer)
  document.getElementById('hamburguer').addEventListener('click', toggleLeftSideNav)
  document.getElementById('create-task').addEventListener('click', openTaskModal)
  document.getElementById('create-sequence').addEventListener('click', createSequence)
  if (mobileEnvironments.test(navigator.userAgent)) setUpEnvironmentWithModule(mobile)
  else setUpEnvironmentWithModule(desktop)
})

/**
 * Method responsible for the preset timer
 * selection. It splits the time in the options
 * dataset and passes it to the selectTimer method.
 */
function handlePresetTimeSelection(event) {
  const timeSplitted = event.target.dataset.time.split(':')
  selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  changeTimerValueOnScreen()
  reloadTimer()
}

/**
 * Method responsible for the timer selection
 * based on hours, minutes and seconds selected.
 * Those three arguments are then attributed to the 
 * timer in timerController.
 */
function selectTimer(hours, minutes, seconds) {
  if (hours > 23) hours = 23
  if (minutes > 59) minutes = 59
  if (seconds > 59) seconds = 59
  timerController.selectTimer(hours, minutes, seconds)
  timeFormatted = timerController.getTimeFormatted()
  updatePresetTimes()
}

/**
 * Method responsible for managing the timer mode 
 * changes during user DOM manipulation. It executes 
 * when playing or pausing (when alarm is playing or not) 
 * the timer execution.
 */
function toggleTimerMode() {
  if (timerController.isPlaying) return toggleTimerModeWhenPlaying()
  if (alarmIsPlaying()) return toggleTimerModeWhenAlarmPlaying()

  return toggleTimerModeWhenNotPlaying()
}

function toggleTimerModeWhenPlaying() {
  timerController.toggleTimerMode(false)
  changeExecuteImage()
  stopTimer()
}

function toggleTimerModeWhenAlarmPlaying() {
  timerController.toggleTimerMode(false)
  changeExecuteImage()
  stopAlarm()
}

function toggleTimerModeWhenNotPlaying() {
  timerController.toggleTimerMode(true)
  changeExecuteImage()
  startTimer()
}

function reloadTimer() {
  stopTimer()
  timerController.reloadTimer()
  changeTimerValueOnScreen()
  changeExecuteImage()
  stopAlarm()
}

function startTimer() {
  timeout = setTimeout(countDown, oneSecond)
}

function stopTimer() {
  clearTimeout(timeout)
}

/**
 * Method responsible for the timer count down
 * while there's still time to count. When it ends,
 * the timer reloads and the alarm plays.
 */
function countDown() {
  updateTimer()
  if (!timerController.timeIsOver()) {
    timeout = setTimeout(countDown, oneSecond)
    return
  }

  reloadTimer()
  playAlarm()
}

/**
 * Method responsible for keeping the DOM timer
 * up to date with the internal timer calculation.
 */
function updateTimer() {
  timerController.updateTimer()
  changeTimerValueOnScreen()
}

function changeTimerValueOnScreen() {
  timeFormatted = timerController.getTimeFormatted()
  const timeSplitted = timeFormatted.split(':')
  document.getElementById('hours').value = timeSplitted[0]
  document.getElementById('minutes').value = timeSplitted[1]
  document.getElementById('seconds').value = timeSplitted[2]
}

/**
 * Method responsible por updating the preset timer
 * options when selected, hilightning the selected option
 * and removing the highlight from the others.
 */
function updatePresetTimes() {
  const optionItems = document.querySelectorAll('.timer__options--item')
  optionItems.forEach(option => {
    if (option.dataset.time === timeFormatted) option.classList.add('selected')
    else option.classList.remove('selected')
  })
}

function alarmIsPlaying() {
  return !document.getElementById('alarm').paused
}

function playAlarm() {
  const alarm = document.getElementById('alarm')
  alarm.currentTime = 0
  alarm.play()
}

function stopAlarm() {
  const alarm = document.getElementById('alarm')
  alarm.pause()
  alarm.currentTime = 0
}

function changeExecuteImage() {
  document.getElementById('execute').src = timerController.isPlaying ? '../public/sources/pause.svg' : '../public/sources/play.svg'
}

/**
 * Method responsible for the left side 
 * navigation bar opening and closing.
 */
function toggleLeftSideNav() {
  toggleHamburguerButton()

  const leftSideNav = document.getElementById('left-side-nav')
  toggleClass(leftSideNav, 'left-side-nav-container--open')
}

/**
 * Method responsible for the transition
 * from the hamburguer to the close button.
 */
function toggleHamburguerButton() {
  const hamburguer = document.getElementById('hamburguer')
  toggleClass(hamburguer, 'hamburguer-close')
  toggleClass(hamburguer.children[0], 'close-button--up-line')
  toggleClass(hamburguer.children[1], 'hide')
  toggleClass(hamburguer.children[2], 'close-button--down-line')
}

/**
 * Method responsible for generically removing
 * or inserting a certain style (CSS class) from
 * a DOM element.
 */
function toggleClass(element, style) {
  if (element.classList.contains(style)) element.classList.remove(style)
  else element.classList.add(style)
}

function openTaskModal() {
  createTask()
  toggleLeftSideNav()
  const taskModal = <TaskModal
    closeModal={closeTaskModal.bind(this)}
    setTaskTitle={setTaskTitle.bind(this)}
    setTaskDescription={setTaskDescription.bind(this)}
    setTaskTimer={setTaskTimer.bind(this)}
    saveTask={saveTask.bind(this)}
  />
  ReactDOM.render(taskModal, document.getElementById('task-modal'))
  toggleBodyScroll()
}

function closeTaskModal() {
  deleteTask()
  ReactDOM.unmountComponentAtNode(document.getElementById('task-modal'))
  toggleBodyScroll()
}

function createTask() {
  taskController.createTask()
}

function setTaskTitle(event) {
  taskController.title = event.target.value
}

function setTaskDescription(event) {
  taskController.description = event.target.value
}

function setTaskTimer(hours, minutes, seconds) {
  taskController.setTaskTimer(hours, minutes, seconds)
}

function saveTask() {
  if (!taskController.isTaskReady()) return
  if (!sequenceController.isThereAnySequence()) {
    createSequence()
    setSequenceTitle()
  }

  sequenceController.subscribeTaskInSequence(taskController.task)
  closeTaskModal()
}

function deleteTask() {
  taskController.deleteTask()
}

function createSequence() {
  sequenceController.createSequence()
}

function setSequenceTitle(title = 'Sem nome') {
  sequenceController.title = title
}

function toggleBodyScroll() {
  const body = document.querySelector('body')
  if (body.classList.contains('no-scroll')) body.classList.remove('no-scroll')
  else body.classList.add('no-scroll')
}

/**
 * Method responsible for setting up the DOM
 * with the environment correspondent script,
 * to avoid extra script loading.
 */
function setUpEnvironmentWithModule(module) {
  const head = document.querySelector('head')
  const script = document.createElement('script')
  script.type = 'module'
  script.src = module
  head.appendChild(script)
}

export default { selectTimer }