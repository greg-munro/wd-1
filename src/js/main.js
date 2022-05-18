/* global WebsyDesigns include TopMenu */ 

include('./classes/topMenu.js')

const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()
