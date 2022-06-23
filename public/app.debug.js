/* global WebsyDesigns include localStorage renderPhoneDetail renderPhoneList */ 

/* global WebsyDesigns router */

const el = document.getElementById('all-phones')

const apiService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneList () {
  apiService.get('phones').then(phones => {
    if (router.currentParams.items.brand && router.currentParams.items.brand !== '') {
      phones = phones.filter(p => p.brand === router.currentParams.items.brand)
    }
    if (router.currentParams.items.color) {
      phones = phones.filter(p => p.color === router.currentParams.items.color)
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
    el.innerHTML = html
  })
}

renderPhoneList()

/* global WebsyDesigns */

const appleEl = document.getElementById('apple-phones')
const appleService = new WebsyDesigns.APIService('http://localhost:3000')
appleService.get('phones').then(phones => {
  let html = phones.filter(phone => phone.brand === 'Apple').map(phone =>  
    (`
    <div class="card websy-trigger" data-view="phonedetail?id=${phone.id}">
    <img src=${phone.image_url} width="200px class="card--image">
    <div class="card--stats">
        <span class="card--star">${phone.rating}</span>
    </div>
    <p class="card--title">${phone.name}</p>
    <p class="card--price"><span class="bold">${phone.price}</span></p>
    </div>
    `)
  ).join('')
  appleEl.innerHTML = html
})

/* global WebsyDesigns */

const samsungEl = document.getElementById('samsung-phones')
const samsungService = new WebsyDesigns.APIService('http://localhost:3000')
samsungService.get('phones').then(phones => {
  let html = phones.filter(phone => phone.brand === 'Samsung').map(phone =>  
    (`
    <div class="card websy-trigger" data-view="phonedetail?id=${phone.id}">
    <img src=${phone.image_url} width="200px class="card--image">
    <div class="card--stats">
        <span class="card--star">${phone.rating}</span>
    </div>
    <p class="card--title">${phone.name}</p>
    <p class="card--price"><span class="bold">${phone.price}</span></p>
    </div>
    `)
  ).join('')
  samsungEl.innerHTML = html
})

/* global WebsyDesigns localStorage */ 

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
let updateCart = localStorage.getItem('updateCart')

if (updateCart !== '') {
  updateCart = JSON.parse(updateCart)
  detailService.get('phones').then(phones => {
    data = phones
    updateCart.forEach(item => addToCart(item.id))
  })
}

function addToCart (id) {
  const item = data.find((phone) => phone.id === id)
  cart.push(item)
  console.log(cart)
  shoppingCart.innerHTML += 

  ` <div class="cart-list"> <div class="cart-item"> 

      <h3>${item.name}</h3>
      <img src=${item.image_url} width="200px">
      <p>${item.description}</p>
      <p>${item.price}</p>
  </div></div>`
  localStorage.setItem('updateCart', JSON.stringify(cart))
} 

// /* global WebsyDesigns include */
// include('./phoneDetail.js')

// shoppingCart.innerHTML = `<div>

// </div>`


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.on('show', (view, params) => {
  if (view === 'phonedetail') {
    renderPhoneDetail(params.items.id)
  }
})
router.on('hide', (view) => {
  console.log(view)
})

router.init()

let darkMode = localStorage.getItem('darkMode')
document.body.classList[darkMode === 'enabled' ? 'add' : 'remove']('dark-mode')

const switchTest = new WebsyDesigns.Switch('dark-mode', {
  label: '☀️/🌙',
  enabled: darkMode === 'enabled',
  onToggle: enableDarkMode => { 
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null)
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode')
  }

})

const brandFilter = new WebsyDesigns.WebsyDropdown('dropdown-2', {
  label: 'Brand',
  multiSelect: true,
  onItemSelected: (item, selectedIdexes, items) => {
    console.log(item, selectedIdexes, items)
    router.addUrlParams({
      brand: item.label
    })
    renderPhoneList()
  }, 
  onClearSelected: () => {
    router.addUrlParams({
      brand: ''
    })
    renderPhoneList()
  },
  items: [
    {label: 'Apple'},
    {label: 'Samsung'}
  ]}
)

const colorFilter = new WebsyDesigns.WebsyDropdown('dropdown-3', {
  label: 'Color',
  multiSelect: true,
  onItemSelected: (item, selectedIdexes, items) => {
    console.log(item, selectedIdexes, items)
    router.addUrlParams({
      color: item.label
    })
    renderPhoneList()
  },
  items: [
    {label: 'Black'},
    {label: 'White'},
    {label: 'Blue'},
    {label: 'Purple'},
    {label: 'Red'}
  ]}
)

let coll = document.getElementsByClassName('collapsible')
let i

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active')
    let content = this.nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } 
    else {
      content.style.display = 'block'
    }
  })
}
