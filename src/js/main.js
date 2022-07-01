/* global WebsyDesigns include localStorage renderPhoneDetail renderPhoneList */ 

include('./components/phonesList.js')
include('./components/applePhones.js')
include('./components/samsungPhones.js')
include('./components/phoneDetail.js')

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
