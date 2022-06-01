/* global WebsyDesigns */ 

const detail = document.getElementById('phonedetail')

const detailService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneDetail () {
  detailService.get('phones').then(phones => {
    let html = phones.filter(phone => phone.id === '1').map(phone => 
      (`
      <p>${phone.name}</p>
      `)
    )
    detail.innerHTML = html
  })
}

renderPhoneDetail()
