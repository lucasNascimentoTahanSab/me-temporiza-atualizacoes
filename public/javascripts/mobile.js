(() => {
	setUpEvents()
})()

function setUpEvents() {
	window.addEventListener('scroll', manageNavbarPresentation)
	document.getElementById('back-to-home').addEventListener('click', goBackToHome)
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