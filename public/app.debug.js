/* global WebsyDesigns include localStorage */ 

/* global WebsyDesigns */

const el = document.getElementById('all-phones')

const apiService = new WebsyDesigns.APIService('http://localhost:3000')
apiService.get('phones').then(phones => {
  let html = phones.map(phone => 
    (`
    <div class="card" width="300px">
    
    <img src=${phone.image_url} width="200px class="card--image">Hello
    
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

/* global WebsyDesigns */

const appleEl = document.getElementById('apple-phones')
const appleService = new WebsyDesigns.APIService('http://localhost:3000')
appleService.get('phones').then(phones => {
  let html = phones.filter(phone => phone.brand === 'Apple').map(phone =>  
    (`
    <div class="card">
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
    <div class="card">
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


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

let darkMode = localStorage.getItem('darkMode')

const switchTest = new WebsyDesigns.Switch('dark-mode' /* this is the ID being called */, {
  label: '☀️/🌚', 
  onToggle: enableDarkMode => { /* this is calling a function straight away */
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null)
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode')
  }

})
// const drop = new WebsyDesigns.WebsyDropdown('dropdown')
