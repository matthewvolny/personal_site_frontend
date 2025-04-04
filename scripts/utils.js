function addInView() {
    const sections = document.querySelectorAll("section");
    for (let i = 0; i < sections.length; i++) {
        let topSide = sections[i].getBoundingClientRect().top;
        let viewportHeight = document.documentElement.clientHeight;
        if (topSide <= viewportHeight - viewportHeight / 5) {
            sections[i].setAttribute("class", "in-viewport");
        }
    }
}

const get_projects = async () => {
    const response = await fetch('https://tiny-tanuki-0bad90.netlify.app/api/project', {
    // const response = await fetch('http://localhost:3000/project', {
        method: "GET"
    })

    const projects = await response.json()
    return projects

}

function format_projects(projects) {

    let formatted_projects = {}

    for (const project of projects) {
        let project_id = project['project_id']

        if (!formatted_projects[project_id]) {
            formatted_projects[project_id] = []
            formatted_projects[project_id].push(project)
        } else {
            formatted_projects[project_id].push(project)
        }
    }

    return formatted_projects
}

const get_and_format_projects = async () => {
    let projects = await get_projects();  // Wait for the promise to resolve
    const formatted_projects = format_projects(projects)

    return formatted_projects
}

function render_projects(formatted_projects) {

    const project_element = document.getElementById('project')
    const fragment = document.createDocumentFragment();

    for (const project_id in formatted_projects) {
        console.log(formatted_projects[project_id])

        //get title, summary, and display image
        let title = null
        let summary = null
        let display_image = null

        for (const project_step of formatted_projects[project_id]) {

            if (project_step['type'] == 'title') {
                title = project_step
                continue
            } else if (project_step['type'] == 'summary') {
                summary = project_step
                continue
            } else if (project_step['type'] == 'displayimage') {
                display_image = project_step
                continue
            }

            if (title && summary && display_image) {
                break;
            }

        }

        const project_image_container = document.createElement("a");
        project_image_container.classList.add('project-image-container');
        project_image_container.id = display_image['project_id'];
        project_image_container.href = "pages/blog.html"

        const image = document.createElement("img");
        image.src = display_image['public_url']
        image.alt = 'description...'

        const project_details = document.createElement("div");
        project_details.classList.add('project-details');

        const blank = document.createElement("div");
        blank.classList.add('blank');

        const project_name = document.createElement("div");
        project_name.classList.add('project-name');
        project_name.innerText = `${title['content']}`

        project_image_container.appendChild(image)
        project_image_container.appendChild(project_details)
        project_image_container.appendChild(blank)
        project_details.appendChild(project_name)

        fragment.appendChild(project_image_container)

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

function save_project_in_session_storage(data, all_data) {

    if (all_data) {
        sessionStorage.setItem('all_projects', JSON.stringify(data));
    } else {
        sessionStorage.setItem('data', JSON.stringify(data));
    }
}

function remove_animations_and_make_sections_visible() {
    // If sessionStorage exists (user is coming back), we remove animations and immediately make sections visible
    const about_button = document.getElementById('nav_about');
    const projects_button = document.getElementById('nav_projects');
    const blog_button = document.getElementById('nav_blog');
    const contact_button = document.getElementById('nav_contact');
    const sign_in_button = document.getElementById('nav_sign-in');
    const logo_image = document.getElementById('logo');

    about_button.classList.remove("animation_about");
    projects_button.classList.remove("animation_projects");
    blog_button.classList.remove("animation_blog");
    contact_button.classList.remove("animation_contact");
    sign_in_button.classList.remove("animation_sign-in");
    logo_image.classList.remove("animation_image");

    const name = document.getElementsByClassName('name_animation')[0];
    const blurb = document.getElementsByClassName('intro-blurb_animation')[0];
    const photo_container = document.getElementsByClassName("my_photo_animation")[0];

    name.classList.remove("name_animation");
    blurb.classList.remove("intro-blurb_animation");
    photo_container.classList.remove("my_photo_animation");

    const sections = document.querySelectorAll("section");

    for (const section of sections) {
        section.setAttribute("class", "in-viewport");
        section.style.visibility = 'visible';
        section.style.opacity = '1';
        section.style.transition = 'none';  // Disable transition to skip animation
    }
}

function set_close_button_event_listener() {
    const close_button = document.getElementById('close-button')

    close_button.addEventListener('click', function () {
        console.log('click')
        const background_mask = document.getElementsByClassName('background-mask')[0]
        const login_container = document.getElementsByClassName('login-container')[0]
    
        background_mask.id = 'login_hidden'
        login_container.id = 'login-container-hidden'
    });
}

function set_sign_in_button_event_listener() {
    
    let sign_in_button = document.getElementById('sign-in')

    sign_in_button.addEventListener('click', function () {
        
        const background_mask = document.getElementsByClassName('background-mask')[0]
        const login_container = document.getElementsByClassName('login-container')[0]
    
        background_mask.id = 'login_visible'
        login_container.id = 'login-container-visible'
    });
}

function add_footer_icon_event_listener() {
        const footerTopIconImages = document.querySelectorAll(".footer-link-top img");
        const footerBottomIconImages = document.querySelectorAll(".footer-link-bottom img");
        
        for (let i = 0; i < footerTopIconImages.length; i++) {
            footerTopIconImages[i].addEventListener("mouseover", () => {
                footerBottomIconImages[i].setAttribute(
                    "id",
                    "show-footer-link-bottom-icon"
                );
            });
        }
        
        for (let i = 0; i < footerTopIconImages.length; i++) {
            footerTopIconImages[i].addEventListener("mouseleave", () => {
                footerBottomIconImages[i].removeAttribute("id");
            });
        }
    }

export {
    addInView,
    get_and_format_projects,
    // get_projects,
    // format_projects,
    render_projects,
    // save_project_in_local_storage,
    save_project_in_session_storage,
    set_sign_in_button_event_listener,
    set_close_button_event_listener,
    add_footer_icon_event_listener,
    remove_animations_and_make_sections_visible
};