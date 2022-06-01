/* global WebsyDesigns include router */ 

const detail = document.getElementById('phonedetail')

const detailService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneDetail () {
  detailService.get('phones').then(phones => {
    console.log('phones', phones)
  })
}

renderPhoneDetail()
