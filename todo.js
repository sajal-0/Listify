const mainTodoElem = document.querySelector('.todo-lits-ele');
const inputValue = document.getElementById('inputValue');


const getTodoListLocalstorage = () => {
    return JSON.parse(localStorage.getItem("youytubeTodoList"));
}

const addTodoListLocalStorage = (arrrayOftodo) => {
    return localStorage.setItem('youytubeTodoList', JSON.stringify(arrrayOftodo))
}

let arrrayOftodo = getTodoListLocalstorage() || [];

const addTodoDynamicElement = (currEle) => {
    const divElement = document.createElement("div");
    divElement.classList.add('main-todo-div');
    divElement.innerHTML = `<li>${currEle}</li> <button class="deletebtn">Delete</button>`;
    mainTodoElem.append(divElement)
}

const addTodoList = (e) => {
    e.preventDefault();
    const todoListValue = inputValue.value.trim();

    inputValue.value = "";

    if (todoListValue != "" && !arrrayOftodo.includes(todoListValue)) {
        arrrayOftodo.push(todoListValue);
        arrrayOftodo = [... new Set(arrrayOftodo)];
        console.log(arrrayOftodo);
        localStorage.setItem("youytubeTodoList", JSON.stringify(arrrayOftodo))

        addTodoDynamicElement(todoListValue);
    }

}


const showTodoList = () => {
    console.log(arrrayOftodo);

    arrrayOftodo.forEach((currEle) => {
        addTodoDynamicElement(currEle);
    });
}
showTodoList();

const removeTodoEle = (e) => {
    // console.log(e.target)
    const todoRemove = e.target;
    let todoListContent = todoRemove.previousElementSibling.innerText;
    let parentElem = todoRemove.parentElement;
    console.log(todoListContent);

    arrrayOftodo = arrrayOftodo.filter((curTodo) => {
        console.log(curTodo)
        return curTodo != todoListContent.toLowerCase();
    });

    addTodoListLocalStorage(arrrayOftodo);
    parentElem.remove();
    console.log(arrrayOftodo)

}

mainTodoElem.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.target.classList.contains("deletebtn"))
    if (e.target.classList.contains("deletebtn")) {
        removeTodoEle(e);
    }
})

document.querySelector(".btn").addEventListener('click', (e) => {

    addTodoList(e);
}); 