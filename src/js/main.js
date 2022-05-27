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
