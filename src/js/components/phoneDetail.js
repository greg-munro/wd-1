/* global WebsyDesigns include router */ 

const detail = document.getElementById('phonedetail')

const detailService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneDetail () {
  detailService.get('phones').then(phones => {
    if (router.currentParams.items.brand) {
      phones = phones.filter(p => p.brand === router.currentParams.items.brand)
    }
    let html = phones.map(phone => 
      (`
      <div class="card websy-trigger" data-view="phonedetail?id=${phone.id}" width="300px">
      
      <img src=${phone.image_url} width="200px class="card--image">
      
      <div class="card--stats">
          <span class="card--star">${phone.rating}</span>
      </div>
      <p class="card--title">${phone.name}</p>
      <p class="card--price"><span class="bold">${phone.price}</span></p>
      
      </div>
      `)
    ).join('')
    detail.innerHTML = html
  })
}

renderPhoneDetail()
