const selectTimer = window.bundleExport.selectTimer;

(() => {
	setUpEvents()
})()

function setUpEvents() {
	window.addEventListener('click', formatTimeInputs)
	window.addEventListener('scroll', manageNavbarPresentation)
	document.getElementById('back-to-home').addEventListener('click', goBackToHome)
	$('#hours').change(handleCustomTimeSelection)
	$('#minutes').change(handleCustomTimeSelection)
	$('#seconds').change(handleCustomTimeSelection)
}

/**
 * Method responsible for, when clicking outside
 * the time inputs, updating them to 2 digits when
 * its length is minor.
 */
function formatTimeInputs(event) {
	if (event.target.id === 'hours' || event.target.id === 'minutes' || event.target.id === 'seconds') return

	const timeInputs = document.querySelectorAll('[data-id="timeInput"]')
	timeInputs.forEach(timeInput => {
		if (timeInput.value.length === 2) return
		timeInput.value = '0' + timeInput.value
	})
}

function handleCustomTimeSelection() {
	selectTimer(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('seconds').value)
}

function goBackToHome() {
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
	if (currentScrollPosition >= timer.getBoundingClientRect().y) {
		navbarTitle.classList.remove('hide')
		navbar.classList.add('box-shadow')
		navbar.classList.add('dark-page')
	} else {
		navbarTitle.classList.add('hide')
		navbar.classList.remove('box-shadow')
		navbar.classList.remove('dark-page')
	}
}