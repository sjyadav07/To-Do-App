const inputbox = document.querySelector("#addwork");
const addbtn = document.querySelector("#addbtn");
const worklist = document.querySelector(".worklist");

let editTodo = null;  // Initialize editTodo variable

// Function to submit the work when the add button is clicked
const addwork = () => {
    const inputText = inputbox.value.trim();

    if (inputText.length <= 0) {
        alert("Abe kuchh likh to pahle.");
        return false;
    }

    if (addbtn.value === "Edit") {
        // If we're editing, update the previous element's content
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addbtn.value = 'Add';
        inputbox.value = '';
        editTodo = null; // Reset editTodo after editing
    } else {
        // Creating li element
        const li = document.createElement("li");

        // Creating p tag and adding the input text to it
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Creating edit button
        const editbtn = document.createElement("button");
        editbtn.innerHTML = "Edit";
        li.appendChild(editbtn);
        editbtn.classList.add('btn', "changebtn");

        // Creating remove button
        const removebtn = document.createElement("button");
        removebtn.innerHTML = "Remove";
        li.appendChild(removebtn);
        removebtn.classList.add("btn", "deletebtn");

        // Append the li to the worklist
        worklist.appendChild(li);

        // Save to local storage
        saveLocalTodos();
    }

    // Clear the input field after adding
    inputbox.value = '';
}

// Function to update or delete the todo
const updateTodo = (e) => {
    if (e.target.innerHTML === 'Remove') {
        // Remove the todo item when "Remove" is clicked
        e.target.parentElement.remove();
        saveLocalTodos();  // Update localStorage after removal
    } else if (e.target.innerHTML === "Edit") {
        // Set the input field to the current text when "Edit" is clicked
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";  // Change button to "Edit"
        editTodo = e;  // Store the event to identify which todo to edit
    }
}

// Function to save todos to local storage
const saveLocalTodos = () => {
    const todos = [];
    const todoItems = worklist.querySelectorAll("li");

    todoItems.forEach((item) => {
        const text = item.querySelector("p").innerHTML;
        todos.push(text);
    });

    // Save todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listeners for the buttons
addbtn.addEventListener("click", addwork);
worklist.addEventListener("click", updateTodo);
addbtn.addEventListener("touchstart", addwork);
worklist.addEventListener("touchstart", updateTodo);

// Load saved todos from localStorage (optional: to persist the data)
const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
        todos.forEach((todo) => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            const editbtn = document.createElement("button");
            editbtn.innerHTML = "Edit";
            li.appendChild(editbtn);
            editbtn.classList.add('btn', "changebtn");

            const removebtn = document.createElement("button");
            removebtn.innerHTML = "Remove";
            li.appendChild(removebtn);
            removebtn.classList.add("btn", "deletebtn");

            worklist.appendChild(li);
        });
    }
}

// Load todos when the page is loaded
loadTodos();
