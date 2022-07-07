/* global
 WebsyDesigns
include 
localStorage
renderPhoneDetail 
renderPhoneList
WebsyCarousel 
*/ 

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

const hamBtn = document.getElementById('hamburger')
const navList = document.getElementById('cent')
const rightBtns = document.getElementById('right')

function toggleButton () {
  navList.classList.toggle('show')
  rightBtns.classList.toggle('show')
}

hamBtn.addEventListener('click', toggleButton)

const optionsCarousel = {
  showPrevNext: false,
  frames: [
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255238/5b1d5d879ef142125913db3a',
          style: 'background-size: cover; background-position: center;'
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    },
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1601975921/18',
          style: 'background-size: cover; background-position: center;'
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    },
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255267/5b1d5db69ef142125913db3c',
          style: 'background-size: cover; background-position: center;' 
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    },
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1529255498/5b1fdab3b9bab019783777de',
          style: 'background-size: cover; background-position: center;'
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    },
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1536047711/ydtbcvwspuk8bkdd3tj1',
          style: 'background-size: cover; background-position: center;'
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    },
    {
      images: [
        {
          url: 'http://res.cloudinary.com/hlra7fkjj/raw/upload/v1536043081/5b8e164cb8a6df0014766a14',
          style: 'background-size: cover;background-position: center;'
        }
      ],
      text: [
        {
          html: `<div></div>`,
          style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
          classes: 'murky-bg'
        }
      ]
    }
  ]
}

const carouselHomePage = new WebsyCarousel('carousel', optionsCarousel)
