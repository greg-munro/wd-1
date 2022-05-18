/* global WebsyDesigns include TopMenu */ 

/* global getPageContents navController */ 
class TopMenu {
  constructor (elementId, options) {    
    const el = document.getElementById(elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `
        <div class="dpg-top-menu">
          <div id="campaignDropdown" class="top-menu-campaign"></div>  
          <button data-view="usermenu" data-group="usermenu" class="trigger-toggle trigger-item user-menu-button"></button>
          <div class="view card dpg-user-menu" id="userMenu" data-view="usermenu" data-group="usermenu">
            <div data-view="usermenu" data-group="usermenu" class="trigger-toggle trigger-item top-menu-mask"></div>
            <ul>
              <li class="user-menu-item logout">
                <a href="prelogout">
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><title>ionicons-v5-o</title><path d="M304,336v40a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V136a40,40,0,0,1,40-40H256c22.09,0,48,17.91,48,40v40" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><polyline points="368 336 448 256 368 176" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="176" y1="256" x2="432" y2="256" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
                </a>
              </li>
            <ul>
          </div>
        </div>
      `
    }
  }
  handleClick (event) {
    // if (event.target.classList.contains('top-menu-mask')) {
    //   navController.navigate('usermenu', 'usermenu', true)      
    // }
  }
}


const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const apiService = new WebsyDesigns.APIService('https://localhost/4000/phones')
console.log(apiService)
