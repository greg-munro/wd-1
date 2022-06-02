/* global WebsyDesigns */ 

const detail = document.getElementById('phonedetail')

const detailService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneDetail (id) {
  detailService.get('phones').then(phones => {
    let html = phones.filter(phone => phone.id === +id).map(phone => 
      (`<div class="phone-detail-card">
      <div class="card" width="300px">
      
      <img src=${phone.image_url} width="200px class="card--image">
      
      <div class="card--stats">
          <span class="card--star">${phone.rating}</span>
      </div>
      <p class="card--title">${phone.name}</p>
      <h3 class="card--price"><span class="bold">${phone.price}</span></h3>
     <br/>
     <button class="add-cart">Add to Cart   <i class="fa-solid fa-plus"></i></button>
     <p>${phone.detailed_description}</p>
      </div>
      </div>
      `)
    )
    detail.innerHTML = html
  })
}

renderPhoneDetail()
