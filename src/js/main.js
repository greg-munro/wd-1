/* global WebsyDesigns include */ 

include('./classes/phonesList.js')

// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()
