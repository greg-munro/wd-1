/* global WebsyDesigns include */ 

/* global WebsyDesigns */

class List {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)

    const el = document.getElementById(this.elementId)
    this.render()
  }
}

const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')

const phonesList = apiService.get('phones').then(phonesList => {
  console.log(phonesList)
})


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()
