/* global WebsyDesigns include localStorage */ 

include('./components/phonesList.js')
include('./components/applePhones.js')

// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

let darkMode = localStorage.getItem('darkMode')

const switchTest = new WebsyDesigns.Switch('dark-mode' /* this is the ID being called */, {
  label: '☀️/🌚', 
  onToggle: enableDarkMode => { /* this is calling a function straight away */
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null)
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode')
  }

})
// const drop = new WebsyDesigns.WebsyDropdown('dropdown')
