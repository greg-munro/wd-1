/* global WebsyDesigns localStorage */ 

const detail = document.getElementById('phonedetail')
const shoppingCart = document.getElementById('shopping-cart')
let countEl = document.getElementById('item-count')

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
let count = 0
let updateCart = localStorage.getItem('updateCart')

if (updateCart !== '') {
  updateCart = JSON.parse(updateCart)
  detailService.get('phones').then(phones => {
    data = phones
    updateCart.forEach(item => addToCart(item.id))
    // updateCart.forEach(item => removeFromCart(item.id))
  })
}

function addToCart (id) {
  const item = data.find((phone) => phone.id === id)
  cart.push(item)
  console.log(cart)
  shoppingCart.innerHTML += 

  ` <div class="cart-list" id="cart${item.id}"> <div class="cart-item"> 

      <h3>${item.name}</h3>
      <img src=${item.image_url} width="200px">
      <p>${item.description}</p>
      <b><p>${item.price}</p></b>
      <button class="remove-btn" onclick="decrement(${item.id})">Remove</button>
    </div>
  </div>`
  localStorage.setItem('updateCart', JSON.stringify(cart))
  increment()
} 

function increment () {
  count += 1
  countEl.textContent = count
}

function removeFromCart (id) {
  const item = data.find((phone) => phone.id === id)
  cart = cart.filter(item => item.id !== id)
  let el = document.getElementById(`cart${item.id}`)
  el.remove()
}

function decrement (id) {
  if (count > 0) {
    count -= 1
    countEl.textContent = count
  }
  removeFromCart(id)
  localStorage.setItem('updateCart', JSON.stringify(cart))
}

// if (count === 0) {
//   countEl.classList.toggle('test')
// }
