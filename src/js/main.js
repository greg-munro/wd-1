/* global WebsyDesigns include TopMenu */ 

include('./classes/topMenu.js')

const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')
const phonesList = apiService.get('phones', 1).then(result => {
  console.log(result) // id parameter not working? how to call just 1 phone? is this data parsed automatically?
})
