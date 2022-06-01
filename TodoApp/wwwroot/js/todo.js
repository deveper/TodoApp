
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
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodo)
    clearButton.addEventListener("click", deleteAllTodos)
}

function deleteAllTodos(e) {
    if (confirm("bütün tasklar silinecektir.") === true) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }



}


function filterTodo(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important");
        }
        else {
            listItem.setAttribute("style", "display:block");
        }


    });

}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        if (confirm("bu todo silinecektir") == true) {
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
            showAlert("success", "Todo Silindi");

        }
        else {
            showAlert("info", "TodoSilinmedi");
        }
    }

}
function deleteTodoFromStorage(deletedTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletedTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}



function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {

        addTodoToUI(todo)

    })

}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    let list = new Array();
    let listItems = document.querySelectorAll(".list-group-item");
    list = listItems;
    let text;

    if (listItems.length != 0) {
        try {
            list.forEach(function (i) {
                text = i.textContent;
                if (text === newTodo) {
                    throw alert("Aynı isimli Todo zaten vardır");
                }
                else if (text != newTodo) {
                    return addd(newTodo);
                }
            });
        }
        catch (e) {

        }


    }
    else if (listItems.length === 0) {
        addd(newTodo)
    }









    e.preventDefault();
}

function addd(newTodo) {

    if (newTodo != "") {
        showAlert("success", "Bir Todo Oluşturuldu");
        addTodoToUI(newTodo);
        addTodoToLocalStorage(newTodo);
    }
    else {


        showAlert("danger", "Todo Girmediniz");
    }
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

function showAlert(type, message) {
    //     <div class="alert alert-danger" role="alert">
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
    //textimizi ekleme 
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}
