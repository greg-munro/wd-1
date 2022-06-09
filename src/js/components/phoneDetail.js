/* global WebsyDesigns */ 

const detail = document.getElementById('phonedetail')
const shoppingCart = document.getElementById('shopping-cart')

const detailService = new WebsyDesigns.APIService('http://localhost:3000')
let data 

function renderPhoneDetail (id) {
  detailService.get('phones').then(phones => {
    data = phones
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
     <button class="add-cart" id="add-cart" onclick="addToCart(${phone.id})"><i class="fa-solid fa-cart-plus"></i>Add to cart</button>
     <p>${phone.detailed_description}</p>
      </div>
      </div>
      `)
    )
    detail.innerHTML = html
  })
}
renderPhoneDetail()

// initiate cart
let cart = []
let keepCart = window.localStorage.getItem('shopping-cart')

function addToCart (id) {
  const item = data.find((phone) => phone.id === id)
  cart.push(item)
  console.log(cart)
  shoppingCart.innerHTML += 
  `
    <h1>${item.name}</h1>
      <img src=${item.image_url} width="200px">
  `
  window.localStorage.setItem('shopping-cart', cart)
} 
