import {
    // addInView,
    // get_and_format_projects,
    // render_projects,
    // save_project_in_session_storage,
    set_sign_in_button_event_listener,
    set_close_button_event_listener
} from './utils.js';

const body = document.body

// Retrieve data from sessionStorage
const data = JSON.parse(sessionStorage.getItem('data'));

console.log(data)

render_project_steps(data)

function render_project_steps(project_steps) {

    const blog = document.getElementById('blog')
    const fragment = document.createDocumentFragment();

    let read_time_val = null
    let create_date_val = null

    for (const project_step of project_steps){
        const div = document.createElement("div");

        if (project_step['type'] == 'title') {
            div.classList.add('title');
            div.innerText = `${project_step['content']}`

            read_time_val = project_step['read_time']
            create_date_val = format_create_date(project_step['created_at'])
        } else if (project_step['type'] == 'summary') {
            div.classList.add('summary');
            div.innerText = `${project_step['content']}`
    
        } else if (project_step['type'] == 'heading') {
            div.classList.add('heading_');
            div.innerText = `${project_step['content']}`
        } else if (project_step['type'] == 'text') {
            div.classList.add('text');
            div.innerText = `${project_step['content']}`
        } else if (project_step['type'] == 'code') {
            div.classList.add('code_container');
            
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.classList.add('language-py');
            code.textContent = `${project_step['content']}`

            pre.appendChild(code)
            div.appendChild(pre)
 
            Prism.highlightElement(code);

        } else if (project_step['type'] == 'image' || project_step['type'] == 'displayimage') {
            div.classList.add('image_container');
            
            if (project_step['type'] == 'displayimage') {
                div.classList.add('display_image_container');
            }

            const image = document.createElement("img");
            image.src = project_step['public_url']
            image.width = '500'
            image.alt = 'description...'
            div.appendChild(image)   
        }  

        if (project_step['type'] == 'displayimage') {
            const create_read_time_div = document.createElement("div");

            create_read_time_div.classList.add('date_and_read_time_container');
            
            const read_time = document.createElement("div");
            read_time.innerText = `${read_time_val} min read`
            read_time.id = 'read_time'

            const dot = document.createElement("div");
            dot.innerText = ' - '
            dot.id = 'dot'

            const project_created_date = document.createElement("div");
            project_created_date.innerText = `${create_date_val}`
            project_created_date.id = 'create_date'
    
            create_read_time_div.appendChild(read_time)
            create_read_time_div.appendChild(dot)
            create_read_time_div.appendChild(project_created_date)

            fragment.appendChild(create_read_time_div)
        } 

        if (['displayimage'].includes(project_step['type'])) {
            const spacer_div = document.createElement("div");
            spacer_div.classList.add('spacer');

            fragment.appendChild(spacer_div)
        }  

        if (project_step['type'] == 'summary') {
            const image_text = document.createElement("div");
            image_text.classList.add('image_text');
            image_text.textContent = `photo`


            fragment.appendChild(image_text)
        }

        if (['title', 'displayimage', 'summary', 'heading', 'text', 'code', 'image'].includes(project_step['type'])) {
            fragment.appendChild(div)
        }        
    }

    blog.appendChild(fragment)

}

function format_create_date(raw_date) {
    // Input date string
    const inputDate = raw_date;

    // Create a new Date object
    const date = new Date(inputDate);

    // Array of abbreviated month names
    const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the formatted date
    const day = date.getDate();
    const month = shortMonths[date.getMonth()];
    const year = date.getFullYear();

    // Combine everything to get the final formatted string
    const formattedDate = `${month} ${day}, ${year}`;

    console.log(formattedDate); // Output: Jan 22, 2025
    
    return formattedDate
}

set_sign_in_button_event_listener()
set_close_button_event_listener()

let navDropdown = document.querySelector(".nav-dropdown");
let hamburgerButton = document.querySelector("#nav-icon3");
let blogSection = document.querySelector("#blog");

let dropdownToggle = false;

hamburgerButton.addEventListener("click", () => {
  if (dropdownToggle === false) {
    navDropdown.style.display = "block";
    hamburgerButton.setAttribute("class", "open");
    blogSection.style.marginTop = "2rem";
    dropdownToggle = true;
    set_dropdown_sign_in_button_event_listener()
  } else {
    navDropdown.style.display = "none";
    hamburgerButton.removeAttribute("class", "open");
    blogSection.style.marginTop = "16vh";
    dropdownToggle = false;
  }
});

function set_dropdown_sign_in_button_event_listener() {
    
    let sign_in_button = document.getElementById('dropdown_sign-in')

    sign_in_button.addEventListener('click', function () {
        
        const background_mask = document.getElementsByClassName('background-mask')[0]
        const login_container = document.getElementsByClassName('login-container')[0]
    
        background_mask.id = 'login_visible'
        login_container.id = 'login-container-visible'
    });
}