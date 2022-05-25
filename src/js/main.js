/* global WebsyDesigns include localStorage */ 

include('./components/phonesList.js')

// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const switchTest = new WebsyDesigns.Switch('dark-mode', {
  label: '☀️/🌚', 
  onToggle: (a, b, c) => {
  } })

let darkMode = localStorage.getItem('darkMode')

const enableDarkMode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkMode', null)
}

const darkModeToggle = document.querySelector('#dark-mode')
darkModeToggle.addEventListener('click', () => {
  if (darkMode !== 'enabled') {
    enableDarkMode()
  }
})
