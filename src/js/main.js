/* global WebsyDesigns include TopMenu */ 

include('./classes/topMenu.js')

const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const apiService = new WebsyDesigns.APIService('https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getEventOffers')
console.log(apiService)
