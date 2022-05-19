/* global WebsyDesigns */

const { render } = require("express/lib/response")

class List {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)

    const el = document.getElementById(this.elementId)
    this.render()
  }
}

const apiService = new WebsyDesigns.APIService('https://my-json-server.typicode.com/gmunro90/wd-1/')
const phonesList = apiService.get('phones').then(phonesList => {
  console.log(phonesList)
})

render() {
let html = phonesList.map(phone => {
  '<p>'{phone.name}'</p>'
})
const el = document.getElementById('test')
el.innerHTML = html
}
