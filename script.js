const input = document.getElementById('todo-input');
const btn = document.getElementById('add-btn');
const ul = document.getElementById('todo-list');

//try to load save todos from local storage (if any)
const saved = localStorage.getItem('todos');
// here we extracted a string name saved from local storage
// in the 2nd line if saved is null then make todos an empty array
const todos = saved? JSON.parse(saved) : [];

function saveTodos() {
    // save current todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));

}
//create a dom node for todo object and append it to the list
function createTodoNode(todo , index){

    const li = document.createElement("li");
    // checknox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    //the !! in js is used to convert a simmular boolean value into exact boolean
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change" , () =>{
        todo.completed = checkbox.checked ;

        textSpan.style.textDecoration =  todo.completed?'line-through': "";
        // TODO :visual  feedback : strike through when completed
    saveTodos();
    })
    //texx of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';

    }    
        //add double click event listener to edit todo
        textSpan.addEventListener("dblclick" , () =>{
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null ){
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            }
        })

        //delete todo button
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.addEventListener('click' , ()=>{
            todos.splice(index , 1);
            render();
            saveTodos();

        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li

    }



//render the whole todo list from todo array
function render(){

    ul.innerHTML = '';
    //recreate each item
    todos.forEach((todo , index) =>{
        const node = createTodoNode(todo , index);

        ul.appendChild(node);
    });
}
function addTodo() {
    const text = input.value.trim();
    if(!text){
        return
    }
    //push a new todo obj
    todos.push({text , completed: false});
    input.value = '';
    render();
    saveTodos();
}

btn.addEventListener('click' , addTodo);
render();