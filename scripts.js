import {
    addInView,
    get_and_format_projects,
    render_projects,
    save_project_in_session_storage,
    set_sign_in_button_event_listener,
    set_close_button_event_listener,
    add_footer_icon_event_listener,
    remove_animations_and_make_sections_visible
} from './scripts/utils.js';

let formatted_projects = JSON.parse(sessionStorage.getItem('all_projects'));

// display scroll events and animations on first visit only
if (!formatted_projects) {
    window.addEventListener("scroll", addInView);
    formatted_projects = await get_and_format_projects();
} else {
    remove_animations_and_make_sections_visible()
}

render_projects(formatted_projects);
save_project_in_session_storage(formatted_projects, true);

set_sign_in_button_event_listener()
set_close_button_event_listener()
add_footer_icon_event_listener()

let navDropdown = document.querySelector(".nav-dropdown");
let hamburgerButton = document.querySelector("#nav-icon3");
let introSection = document.querySelector(".intro");

let dropdownToggle = false;

hamburgerButton.addEventListener("click", () => {
  if (dropdownToggle === false) {
    navDropdown.style.display = "block";
    hamburgerButton.setAttribute("class", "open");
    introSection.style.marginTop = "2rem";
    dropdownToggle = true;
    set_dropdown_sign_in_button_event_listener()
  } else {
    navDropdown.style.display = "none";
    hamburgerButton.removeAttribute("class", "open");
    introSection.style.marginTop = "16vh";
    dropdownToggle = false;
  }
});

const navDropdownItems = document.querySelectorAll(".nav-dropdown > ul li > a");

for (let i = 0; i < navDropdownItems.length; i++) {
  navDropdownItems[i].addEventListener("click", (e) => {
    console.log(e.target.textContent);
    dropdownToggle = false;
    navDropdown.style.display = "none";
    hamburgerButton.removeAttribute("class", "open");
    introSection.style.marginTop = "16vh";
  });
}

function set_dropdown_sign_in_button_event_listener() {
    
    let sign_in_button = document.getElementById('dropdown_sign-in')

    sign_in_button.addEventListener('click', function () {
        
        const background_mask = document.getElementsByClassName('background-mask')[0]
        const login_container = document.getElementsByClassName('login-container')[0]
    
        background_mask.id = 'login_visible'
        login_container.id = 'login-container-visible'
    });
}

