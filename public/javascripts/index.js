import EmailController from './emailController.js'
import TimerController from './timerController.js'
import TaskController from './taskController.js'
import SequenceController from './sequenceController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const desktop = '../public/javascripts/desktop.js'
const mobile = '../public/javascripts/mobile.js'

const emailController = new EmailController
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
  document.getElementById('criar-tarefa').addEventListener('click', createTask)
  document.getElementById('cadastrar-sequencia').addEventListener('click', createSequence)
  // document.getElementById('message-name').addEventListener('input', element => setEmailName(element.target.value))
  // document.getElementById('message-email').addEventListener('input', element => setEmailOrigin(element.target.value))
  // document.getElementById('message-title').addEventListener('input', element => setEmailTitle(element.target.value))
  // document.getElementById('message-body').addEventListener('input', element => setEmailMessage(element.target.value))
  // document.getElementById('submit-message').addEventListener('click', submitMessage)
  if (mobileEnvironments.test(navigator.userAgent)) setUpEnvironmentWithModule(mobile)
  else setUpEnvironmentWithModule(desktop)
})

function handlePresetTimeSelection(event) {
  const timeSplitted = event.target.dataset.time.split(':')
  selectTimer(timeSplitted[0], timeSplitted[1], timeSplitted[2])
  changeTimerValueOnScreen()
  reloadTimer()
}

function selectTimer(hours, minutes, seconds) {
  if (hours > 23) hours = 23
  if (minutes > 59) minutes = 59
  if (seconds > 59) seconds = 59
  timerController.selectTimer(hours, minutes, seconds)
  timeFormatted = timerController.getTimeFormatted()
  updatePresetTimes()
}

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

function stopTimer() {
  clearTimeout(timeout)
}

function startTimer() {
  timeout = setTimeout(countDown, oneSecond)
}

function countDown() {
  updateTimer()
  if (!timerController.timeIsOver()) {
    timeout = setTimeout(countDown, oneSecond)
    return
  }

  reloadTimer()
  playAlarm()
}

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

// function setEmailName(name) {
//   emailController.name = name
// }

// function setEmailOrigin(origin) {
//   emailController.origin = origin
// }

// function setEmailTitle(title) {
//   emailController.title = title
// }

// function setEmailMessage(message) {
//   emailController.message = message
// }

// function submitMessage(event) {
//   event.preventDefault()
//   emailController.sendEmail()
// }

function toggleLeftSideNav() {
  toggleHamburguerButton()
  const leftSideNav = document.getElementById('left-side-nav')
  toggleClass(leftSideNav, 'left-side-nav-container--open')
}

function toggleHamburguerButton() {
  const hamburguer = document.getElementById('hamburguer')
  toggleClass(hamburguer, 'hamburguer-close')
  toggleClass(hamburguer.children[0], 'close-button--up-line')
  toggleClass(hamburguer.children[1], 'hide')
  toggleClass(hamburguer.children[2], 'close-button--down-line')
}

function toggleClass(element, style) {
  if (element.classList.contains(style)) element.classList.remove(style)
  else element.classList.add(style)
}

function createTask() {
  taskController.createTask()
}

function deleteTask() {
  taskController.deleteTask()
}

function setTaskTitle(title) {
  taskController.title = title
}

function setTaskDescription(description) {
  taskController.description = description
}

function setTaskTimer(hours, minutes, seconds) {
  taskController.setTaskTimer(hours, minutes, seconds)
}

function subscribeTaskInSequence() {
  sequenceController.subscribeTaskInSequence(taskController.task)
}

function createSequence() {
  sequenceController.createSequence()
}

function deleteSequence() {
  sequenceController.deleteTask()
}

function changeCurrentSequence(currentSequence) {
  sequenceController.currentSequence = currentSequence
}

function setSequenceTitle(title) {
  sequenceController.title = title
}

function setSequenceDescription(description) {
  sequenceController.description = description
}

function setSequenceTasks(tasks) {
  sequenceController.tasks = tasks
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