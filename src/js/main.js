/* global WebsyDesigns include TopMenu */ 

include('./classes/topMenu.js')

const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()
 
const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')

const phonesList = apiService.get('phones/1').then(result => {
  // const id = phonesList.id - how can I get this dynamically after service is called
  console.log(result) // try to render the result & update state etc, how is this done in WD?
})
