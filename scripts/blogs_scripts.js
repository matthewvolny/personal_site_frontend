import {
    // addInView,
    // get_and_format_projects,
    // render_projects,
    // save_project_in_session_storage,
    set_sign_in_button_event_listener,
    set_close_button_event_listener
} from './utils.js';

const project_element = document.getElementById('project')

const sorting_buttons = document.getElementsByClassName('sorting_button')

for (const sorting_button of sorting_buttons) {
    sorting_button.addEventListener('click', function () {
        let selected_button = document.getElementById('selected_button')
        change_selected_button(sorting_button, selected_button)
    });
}

function change_selected_button(button, prev_selected_button) {


    if (button.id != prev_selected_button.id) {
        prev_selected_button.removeAttribute("id");
        button.id = 'selected_button'

        const selected_projects = document.getElementsByClassName('project-image-container')

        if (button.innerText == 'All') {
            for (const project of selected_projects) {
                if (!project.classList.contains('visible')) {
                    // let spacer = project.nextSibling
                    project.classList.add('visible')
                    // spacer.classList.add('spacer_visible')
                }
            }
        } else {
            for (const project of selected_projects) {
                if (!project.classList.contains(button.innerText)) {
                    // let spacer = project.nextSibling
                    project.classList.remove('visible')
                    // spacer.classList.remove('spacer_visible')
                } else {
                    // let spacer = project.nextSibling
                    project.classList.add('visible')
                    // spacer.classList.add('spacer_visible')
                }
            }
        }

    }
}


let formatted_projects = JSON.parse(sessionStorage.getItem('all_projects'));

console.log('here are the formatted projects')
console.log(formatted_projects)

render_projects(formatted_projects)

function render_projects(formatted_projects) {

    const project_element = document.getElementById('project')
    const fragment = document.createDocumentFragment();

    let year = null

    for (const project_id in formatted_projects) {
        console.log(formatted_projects[project_id])

        let created_date = null

        //get title, summary, and display image, etc...
        let title = null
        let summary = null
        let display_image = null
        let read_time_val = null
        let tags = null

        for (const project_step of formatted_projects[project_id]) {
            if (project_step['type'] == 'title') {
                title = project_step
                created_date = project_step['created_at']
                read_time_val = project_step['read_time']
                tags = project_step['tags']
                continue
            } else if (project_step['type'] == 'summary') {
                summary = project_step
                continue
            } else if (project_step['type'] == 'displayimage') {
                display_image = project_step
                continue
            }
        }

        const project_image_container = document.createElement("a");
        project_image_container.classList.add('project-image-container');
        project_image_container.id = display_image['project_id'];
        project_image_container.href = "../pages/blog.html"

        for (const tag of JSON.parse(tags)) {
            project_image_container.classList.add(tag);
        }

        project_image_container.classList.add('visible');
        project_image_container.classList.add('all');



        const image_container = document.createElement("div");
        image_container.classList.add('image_container');

        const image = document.createElement("img");
        image.src = display_image['public_url']
        image.alt = 'description...'

        const project_details = document.createElement("div");
        project_details.classList.add('project-details');

        const project_name = document.createElement("div");
        project_name.classList.add('project-name');
        project_name.innerText = `${title['content']}`

        const project_created_date = document.createElement("div");
        project_created_date.innerText = format_create_date(created_date)
        project_created_date.id = 'create_date'

        const dot = document.createElement("div");
        dot.innerText = ' - '
        dot.id = 'dot'

        const read_time = document.createElement("div");
        read_time.innerText = `${read_time_val} min read`
        read_time.id = 'read_time'

        const description = document.createElement("div");
        description.classList.add('description');
        description.innerText = `${summary['content']}`

        image_container.appendChild(image)
        project_image_container.appendChild(image_container)
        project_image_container.appendChild(project_details)
        project_details.appendChild(project_name)
        project_details.appendChild(read_time)
        project_details.appendChild(dot)
        project_details.appendChild(project_created_date)
        project_details.appendChild(description)

        const date = new Date(created_date);
        const post_year = date.getFullYear();
        
        if (!year) {
            year = post_year
            const post_year_div = document.createElement("div");
            post_year_div.innerText = year
            post_year_div.classList.add('year');
            fragment.appendChild(post_year_div)
        }
      
        if (year != post_year) {
            year = post_year
            const post_year_div = document.createElement("div");
            post_year_div.innerText = year
            post_year_div.classList.add('year');
            fragment.appendChild(post_year_div)
        }

        fragment.appendChild(project_image_container)
        
        // const spacer = document.createElement("div");
        // spacer.classList.add('spacer');
        // spacer.classList.add('spacer_visible');

        // fragment.appendChild(spacer)

    }

    // Append all project elements to the DOM in one go
    project_element.appendChild(fragment);

    // set event listeners on project images
    const project_images = document.getElementsByClassName("project-image-container")

    for (let project_image of project_images) {
        project_image.addEventListener('click', function () {
            save_project_in_session_storage(formatted_projects[project_image.id]
            );
        });
    }

}

function save_project_in_session_storage(data) {
    console.log('in save to session storage function')
    // sessionStorage.clear();
    sessionStorage.setItem('data', JSON.stringify(data));  // Save data to sessionStorage
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
// let hamburgerLi = document.querySelector("#hamburger-li");
let hamburgerButton = document.querySelector("#nav-icon3");
let blogSection = document.querySelector("#blog");

let dropdownToggle = false;

// navDropdown.addEventListener("click", () => {
//     console.log('clicked')
// });

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





