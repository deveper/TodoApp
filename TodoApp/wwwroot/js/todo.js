
//Elementleri seçtik
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const addButton = document.querySelector("#btn btn-danger");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {

        addTodoToUI(todo)

    })

}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo != "") {
        showAlert("success", "Bir Todo Oluşturuldu");
        addTodoToUI(newTodo);
        addTodoToLocalStorage(newTodo);
    }
    else {
        showAlert("danger", "Todo Girmediniz");
    }
    e.preventDefault();

}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;



}
function addTodoToLocalStorage(newTodo) {

    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message) {//bu fonksiyon b
    //     <div class="alert alert-danger" role="al
    //   A simple danger alert—check it out!
    // </div>
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    if (type === "danger") {
        todoInput.style.visibility = 'hidden';
    }
    firstCardBody.appendChild(alertDiv);
    setTimeout(function () {
        alertDiv.remove();
        todoInput.style.visibility = 'visible';
    }, 1000);
}



function addTodoToUI(newTodo) {

    //  <li class="list-group-item d-flex justify-content-between">
    //     Todo 1
    //     <a href = "#" class ="delete-item">
    //         <i class = "fa fa-remove"></i>
    //     </a>

    // </li>
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}
