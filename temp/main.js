/* global WebsyDesigns include localStorage renderPhoneDetail renderPhoneList */ 

/* global WebsyDesigns router */

const el = document.getElementById('all-phones')

const apiService = new WebsyDesigns.APIService('http://localhost:3000')
function renderPhoneList () {
  apiService.get('phones').then(phones => {
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

function sortPhonesAtoZ () {
  
}

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

/* global WebsyDesigns include router */ 

// class PhoneDetail {
//   constructor (elementId, options) {
//     this.elementId = elementId
//     this.options = Object.assign({}, options)
//   }
//   render () {
//     console.log(router)
//   }
// }

function renderPhoneDetail (id) {
  // console.log(id)
  // some kind of render function to render html of the phone that was selected with it's id
}


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.on('show', (view, params) => {
  console.log(view, params)
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

const switchTest = new WebsyDesigns.Switch('dark-mode' /* this is the ID being called */, {
  label: '☀️/🌚',
  enabled: darkMode === 'enabled',
  onToggle: enableDarkMode => { /* this is calling a function straight away */
    localStorage.setItem('darkMode', enableDarkMode ? 'enabled' : null)
    document.body.classList[enableDarkMode ? 'add' : 'remove']('dark-mode')
  }

})

const drop = new WebsyDesigns.WebsyDropdown('dropdown', {
  label: 'test',
  multiSelect: true,
  onItemSelected: (item, selectedIdexes, items) => {
    console.log(item, selectedIdexes, items)
    router.addUrlParams({
      test: item.test
    })
  },
  items: [
    {label: 'a', test: 'cat'},
    {label: 'b', test: 'dog'},
    {label: 'c', test: 'pizza'}

  ]}
)

const drop2 = new WebsyDesigns.WebsyDropdown('dropdown-2', {
  label: 'test',
  multiSelect: false,
  onItemSelected: (item, selectedIdexes, items) => {
    console.log(item, selectedIdexes, items)
    router.addUrlParams({
      brand: item.label
    })
    renderPhoneList()
  },
  items: [
    {label: 'Apple', test: 'cat'},
    {label: 'Samsung', test: 'dog'}
  ]}
)
