/* global WebsyDesigns */

const el = document.getElementById('test')

const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')
apiService.get('phones').then(phones => {
  let html = phones.map(phone => 
    (`<h2>${phone.name}</h2>`)
  )
  el.innerHTML = html
})
