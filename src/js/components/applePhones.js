/* global WebsyDesigns */

const appleEl = document.getElementById('all-phones')

const appleService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')
appleService.get('phones').then(phones => {
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
  appleEl.innerHTML = html
})
