// code for adding projects to db

const buttons = document.getElementsByClassName("button")

const form = document.getElementById("form")

let counter = 0

for (let button of buttons) {
    button.addEventListener('click', function () {
        add_input_box(button.id, button.classList);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const form_data_raw = new FormData(form)

    form_text_elements = document.getElementsByClassName('input_text')

    for (const element of form_text_elements) {
        form_data_raw.append('element_id', element.id);
    }

    // Display the key/value pairs
    // for (var pair of form_data_raw.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    // fetch('http://localhost:3000/project', {
    fetch('https://tiny-tanuki-0bad90.netlify.app/api/project', {
        method: "POST",
        body: form_data_raw
        // mode: "no-cors" // Adds the no-cors mode
    })

        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

function delete_input(button_name) {
    console.log(button_name)

    let form_elements = document.getElementsByClassName("form_el")
    let remove_button = document.getElementsByClassName(button_name) 

    let removed_element_id = null

    for (let element of form_elements) {
        if (element.name == button_name){
            removed_element_id = element.id
            element.remove();
            remove_button[0].remove()
        }
    }

    form_elements = document.getElementsByClassName("form_el")

    for (let element of form_elements) {
        console.log(element.id, removed_element_id)
        if (element.id > removed_element_id){
            element.id = element.id-1
        }
    }


}

function add_input_box(button_id, button_classes) {
    console.log('input box created for', button_id);
    
    let input_box = null

    if (button_classes.contains('textarea')) {
        input_box = document.createElement("textarea");
    } else {
        input_box = document.createElement("input");
    }

    input_box.id = counter++;
    // input_box.classList.add('text');
    // input_box.classList.add(button_id);
    
    random_name = `${button_id}_${Math.floor(Math.random() * 10000)}`;
    input_box.name = random_name

    if (button_classes.contains('textarea')) {
        input_box.type = 'textarea'
        input_box.classList.add('input_textarea');
        input_box.classList.add('form_el');
        input_box.placeholder = `Input ${button_id} here...`;
    } else if (button_classes.contains('text')) {
        input_box.classList.add('input_text');
        input_box.classList.add('form_el');
        input_box.type = 'text'
        input_box.placeholder = `Input ${button_id} here...`;
    } else {
        input_box.classList.add('input_file');
        input_box.classList.add('form_el');
        input_box.type = 'file'
    }

    form.appendChild(input_box);
    
    const remove_button = document.createElement("div");
    remove_button.classList.add('remove_button');
    remove_button.classList.add(random_name);
    remove_button.textContent = "X"

    form.append(remove_button)
    
    remove_button.addEventListener('click', function () {
        delete_input(remove_button.classList[1]);
    })
     
}