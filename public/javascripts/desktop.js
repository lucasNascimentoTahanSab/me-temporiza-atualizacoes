const selectTimer = window.bundleExport.selectTimer

const slides = [];

(() => {
	setUpEvents()
	defineSlides()
	defineCurrentSlide()
})()


function setUpEvents() {
	window.addEventListener('resize', manageWindowResize)
	document.getElementById('back-to-home').addEventListener('click', goBackToHome)
	document.getElementById('left-last').addEventListener('click', goToLast)
	document.getElementById('right-second').addEventListener('click', goToNext)
	document.getElementById('left-home').addEventListener('click', goToLast)
	document.getElementById('right-third').addEventListener('click', goToNext)
	document.getElementById('left-second').addEventListener('click', goToLast)
	document.getElementById('right-fourth').addEventListener('click', goToNext)
	document.getElementById('left-third').addEventListener('click', goToLast)
	$('#hours').keypress(handleCustomTimeSelection)
	$('#minutes').keypress(handleCustomTimeSelection)
	$('#seconds').keypress(handleCustomTimeSelection)
	$('#hours').keydown(handleBackspacePressed)
	$('#minutes').keydown(handleBackspacePressed)
	$('#seconds').keydown(handleBackspacePressed)
}

/**
 * Method responsible for custom time selection in 
 * desktop, updating the time input without the need
 * to backspacing.
 */
function handleCustomTimeSelection(event) {
	if (event.key < '0' || event.key > '9') return false

	const characters = event.target.value.split('')
	event.target.value = characters[1] + event.key
	selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}

/**
 * Method responsible for handling backspacing in custom time 
 * editing. Key code 8 is the correspondent backspace key code when 
 * handling key down and "event.preventDefault()" is needed here to 
 * avoid unexpected behavior.
 */
function handleBackspacePressed(event) {
	if (event.keyCode !== 8) return true

	event.preventDefault()
	const characters = event.target.value.split('')
	event.target.value = characters[0] === '0' ? '00' : '0' + characters[1]
	selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}

/**
 * Method responsible for updating the slides position
 * in the scroll width while window resizes (until it get
 * bellow 52.5rem width).
 */
function manageWindowResize() {
	if (window.matchMedia('(max-width: 52.5rem)').matches) {
		manageTitlePresentation()
		return
	}

	updateSlides()
	const slideShow = document.getElementById('slide-show')
	slideShow.scrollLeft = slides[getCurrentSlidePosition()].position
}

/**
 * Method responsible for getting the user back to
 * the home slide, updating the current slide to 0
 * and hiding the site title.
 */
function goBackToHome() {
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
	if (window.matchMedia('(max-width: 52.5rem)').matches) {
		navbarTitle.classList.add('hide')
		return
	}

	const currentSlide = getCurrentSlidePosition()
	if (currentSlide === 0) navbarTitle.classList.add('hide')
	else navbarTitle.classList.remove('hide')
}