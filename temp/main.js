/* global WebsyDesigns include localStorage */ 

/* global WebsyDesigns */

const el = document.getElementById('all-phones')

const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')
apiService.get('phones').then(phones => {
  let html = phones.map(phone => 
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
  el.innerHTML = html
})


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const switchTest = new WebsyDesigns.Switch('dark-mode', {
  label: '☀️/🌚', 
  onToggle: (a, b, c) => {
  } })

let darkMode = localStorage.getItem('darkMode')

const enableDarkMode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkMode', null)
}

const darkModeToggle = document.querySelector('#dark-mode')
darkModeToggle.addEventListener('click', () => {
  
})
