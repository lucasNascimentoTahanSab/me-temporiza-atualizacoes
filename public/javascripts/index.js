import React from 'react'
import ReactDOM from 'react-dom'
import TimerComponent from '../components/timerComponent'
import TaskModal from '../components/taskModal'
import TaskController from './taskController.js'
import SequenceController from './sequenceController.js'

const mobileEnvironments = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const taskController = new TaskController
const sequenceController = new SequenceController
const slides = [];

const isScreenSmall = () => mobileEnvironments.test(navigator.userAgent) || window.matchMedia('(max-width: 52.5rem)').matches

window.addEventListener('load', () => {
  setUpMobileEvents()
  setUpDesktopEvents()
  putTimerComponentOnScreen()
  window.addEventListener('resize', event => {
    manageNavbarPresentation(event)
    manageWindowResize()
  })
  document.getElementById('hamburguer').addEventListener('click', toggleLeftSideNav)
  document.getElementById('create-task').addEventListener('click', openTaskModal)
  document.getElementById('create-sequence').addEventListener('click', createSequence)
  document.getElementById('back-to-home').addEventListener('click', () => {
    if (isScreenSmall()) goBackToHomeMobile()
    else goBackToHomeDesktop()
  })
})

function setUpMobileEvents() {
  window.addEventListener('scroll', event => { if (isScreenSmall()) manageNavbarPresentation(event) })
}

function setUpDesktopEvents() {
  defineSlides()
  defineCurrentSlide()
  document.getElementById('left-last').addEventListener('click', () => { if (!isScreenSmall()) goToLast() })
  document.getElementById('right-second').addEventListener('click', () => { if (!isScreenSmall()) goToNext() })
  document.getElementById('left-home').addEventListener('click', () => { if (!isScreenSmall()) goToLast() })
  document.getElementById('right-third').addEventListener('click', () => { if (!isScreenSmall()) goToNext() })
  document.getElementById('left-second').addEventListener('click', () => { if (!isScreenSmall()) goToLast() })
  document.getElementById('right-fourth').addEventListener('click', () => { if (!isScreenSmall()) goToNext() })
  document.getElementById('left-third').addEventListener('click', () => { if (!isScreenSmall()) goToLast() })
}

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

function goBackToHomeMobile() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

/**
 * Method responsible for showing up top navigation
 * bar when current scroll position is after timer initial
 * position and hiding it otherwise.
 */
function manageNavbarPresentation(event) {
  const timer = document.getElementById('timer')
  const currentScrollPosition = event.currentTarget.scrollY
  const navbar = document.getElementById('navbar')
  const navbarTitle = document.getElementById('back-to-home')
  if (currentScrollPosition >= timer.getBoundingClientRect().y && isScreenSmall()) {
    navbarTitle.classList.remove('hide')
    navbar.classList.add('box-shadow')
    navbar.classList.add('dark-page')
  } else {
    navbarTitle.classList.add('hide')
    navbar.classList.remove('box-shadow')
    navbar.classList.remove('dark-page')
  }
}

/**
 * Method responsible for updating the slides position
 * in the scroll width while window resizes (until it get
 * bellow 52.5rem width).
 */
function manageWindowResize() {
  if (isScreenSmall()) {
    manageTitlePresentation()
    return
  }

  updateSlides()
  manageTitlePresentation()
  const slideShow = document.getElementById('slide-show')
  slideShow.scrollLeft = slides[getCurrentSlidePosition()].position
}

/**
 * Method responsible for getting the user back to
 * the home slide, updating the current slide to 0
 * and hiding the site title.
 */
function goBackToHomeDesktop() {
  const slideShow = document.getElementById('slide-show')
  slideShow.scrollLeft = 0
  defineCurrentSlide()
  manageTitlePresentation()
}

/**
 * Method responsible for getting the user to the
 * next subscribed slide (if it exists), defining it
 * as the current slide and managing title presentation.
 */
function goToNext() {
  const slideShow = document.getElementById('slide-show')
  const currentSlidePosition = getCurrentSlidePosition()
  const nextSlidePosition = currentSlidePosition < (slides.length - 1) ? currentSlidePosition + 1 : 0
  slideShow.scrollLeft = slides[nextSlidePosition].position
  defineCurrentSlide(slides[nextSlidePosition].position)
  manageTitlePresentation()
}

/**
 * Method responsible for getting the user to the
 * last subscribed slide (if it exists), defining it
 * as the current slide and managing title presentation.
 */
function goToLast() {
  const slideShow = document.getElementById('slide-show')
  const currentSlidePosition = getCurrentSlidePosition()
  const lastSlidePosition = currentSlidePosition > 0 ? currentSlidePosition - 1 : (slides.length - 1)
  slideShow.scrollLeft = slides[lastSlidePosition].position
  defineCurrentSlide(slides[lastSlidePosition].position)
  manageTitlePresentation()
}

/**
 * Method responsible for subscribing the defined slides
 * at the first place (all elements anotated with the inner-container
 * class) to keep track of slide size, current slide and the position of
 * it in the scroll width.
 */
function defineSlides() {
  const slideShow = Array.from(document.getElementsByClassName('inner-container'))
  const slideSize = slideShow[0].clientWidth + (2 * slideShow[0].offsetLeft)
  slideShow.forEach((slide, position) => {
    slides.push({
      position: slideSize * position,
      width: slideSize,
      current: false
    })
  })
}

function defineCurrentSlide(scrollLeft = 0) {
  for (const slide of slides)
    slide.current = slide.position === scrollLeft
}

/**
 * Method responsible for the slide size and position
 * update. The slide size is calculated by adding to the
 * slide width the double of the distance of the slide to
 * the screen left side (its margin).
 */
function updateSlides() {
  const slideShow = document.getElementsByClassName('inner-container')
  const slideSize = slideShow[0].clientWidth + (2 * slideShow[0].offsetLeft)
  slides.forEach((slide, position) => {
    slides[position] = {
      ...slides[position],
      position: slideSize * position,
      width: slideSize
    }
  })
}

function getCurrentSlidePosition() {
  for (let position = 0; position < slides.length; position++)
    if (slides[position].current)
      return position
}

/**
 * Method responsible for hiding the site title 
 * when the window width in minor than 52.5rem or
 * when the user is not in home slide, or showing it
 * otherwise.
 */
function manageTitlePresentation() {
  const navbarTitle = document.getElementById('back-to-home')
  if (isScreenSmall()) {
    navbarTitle.classList.add('hide')
    return
  }

  const currentSlide = getCurrentSlidePosition()
  if (currentSlide === 0) navbarTitle.classList.add('hide')
  else navbarTitle.classList.remove('hide')
}