import React from 'react'
import ReactDOM from 'react-dom'
import TimerComponent from '../components/timerComponent'
import TaskModal from '../components/taskModal'
import TaskController from './taskController.js'
import SequenceController from './sequenceController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const desktop = './public/javascripts/desktop.js'
const mobile = './public/javascripts/mobile.js'

const taskController = new TaskController
const sequenceController = new SequenceController

window.addEventListener('load', () => {
  putTimerComponentOnScreen()
  document.getElementById('hamburguer').addEventListener('click', toggleLeftSideNav)
  document.getElementById('create-task').addEventListener('click', openTaskModal)
  document.getElementById('create-sequence').addEventListener('click', createSequence)
  if (mobileEnvironments.test(navigator.userAgent)) setUpEnvironmentWithModule(mobile)
  else setUpEnvironmentWithModule(desktop)
})

function putTimerComponentOnScreen() {
  const timerComponent = <TimerComponent></TimerComponent>
  ReactDOM.render(timerComponent, document.getElementById('timer'))
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
  toggleLeftSideNav()
  const taskModal = <TaskModal closeModal={closeTaskModal.bind(this)} saveTask={saveTask.bind(this)} />
  ReactDOM.render(taskModal, document.getElementById('task-modal'))
  toggleBodyScroll()
}

function closeTaskModal() {
  deleteTask()
  ReactDOM.unmountComponentAtNode(document.getElementById('task-modal'))
  toggleBodyScroll()
}

function saveTask(task) {
  taskController.subscribeTaskInTasks(task)
  ReactDOM.unmountComponentAtNode(document.getElementById('task-modal'))
  toggleBodyScroll()
}

function deleteTask() {
  taskController.deleteTask()
}

function createSequence() {
  sequenceController.createSequence()
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