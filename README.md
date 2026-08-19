# Todo List App

## Why I Made This Project

I made this Todo List application while following the **CodeWithHarry Todo List project**.

This project is important for me because it is one of my practical JavaScript projects where I started working with:

* DOM manipulation
* JavaScript objects and arrays
* Event listeners
* Functions
* `localStorage`
* JSON
* Creating HTML elements dynamically
* Updating the DOM
* Handling user input
* Checkbox state
* Editing and deleting data
* Saving data so it survives a page refresh

The main purpose of this project was not just to make a Todo List.

I wanted to understand how a real interactive web page works:

```text
User Action
     ↓
JavaScript Event
     ↓
Update JavaScript Data
     ↓
Update DOM
     ↓
Save Data
     ↓
Browser remembers it
```

---

# 1. Project Idea

The application allows me to:

* Add a todo
* Add a todo using the Enter key
* Mark a todo as completed
* Edit a todo
* Delete a todo
* Store todos in browser `localStorage`
* Reload the page without losing existing todos

The basic flow is:

```text
                TODO APP
                    ↓
             User enters text
                    ↓
              Click Add / Enter
                    ↓
               addTodo()
                    ↓
            Add object to todos[]
                    ↓
                 render()
                    ↓
            Create DOM elements
                    ↓
              Display todo
                    ↓
             saveTodos()
                    ↓
             localStorage
```

---

# 2. HTML — Creating the Basic Structure

The HTML is intentionally simple.

I created:

```html
<h1>Todolist</h1>
```

for the heading.

Then:

```html
<input
    type="text"
    id="todo-input"
    placeholder="Enter a todo press add or Enter"
>
```

This is where the user enters a todo.

The important part is:

```html
id="todo-input"
```

because JavaScript later uses this ID to access the input.

Then I created:

```html
<button id="add-btn">Add</button>
```

This gives the user a button to add the todo.

Finally:

```html
<ul id="todo-list"></ul>
```

This starts empty.

JavaScript dynamically creates `<li>` elements and puts them inside this `<ul>`.

So instead of hardcoding:

```html
<li>Study JavaScript</li>
<li>Practice DSA</li>
```

I let JavaScript create them based on my data.

---

# 3. First Important JavaScript Step — Selecting HTML Elements

At the beginning of `script.js`:

```js
const input = document.getElementById('todo-input');
const btn = document.getElementById('add-btn');
const ul = document.getElementById('todo-list');
```

I am basically connecting JavaScript with HTML.

### `input`

```js
const input = document.getElementById('todo-input');
```

represents the text box.

### `btn`

```js
const btn = document.getElementById('add-btn');
```

represents the Add button.

### `ul`

```js
const ul = document.getElementById('todo-list');
```

represents the list where todos will appear.

The mental model:

```text
HTML
 ↓
getElementById()
 ↓
JavaScript variable
 ↓
Now JS can control that element
```

---

# 4. Deciding How to Store a Todo

Instead of storing only strings like:

```js
["Study", "Gym", "DSA"]
```

I decided to store each todo as an object.

Example:

```js
{
    text: "Study JavaScript",
    completed: false
}
```

This is better because a todo has more than just text.

It has:

```text
text
completed
```

So my complete array can look like:

```js
[
    {
        text: "Study JavaScript",
        completed: false
    },
    {
        text: "Practice DSA",
        completed: true
    }
]
```

This is one of the most important ideas in this project.

---

# 5. Creating the Main `todos` Array

I use:

```js
const saved = localStorage.getItem('todos');

const todos = saved ? JSON.parse(saved) : [];
```

The idea is:

```text
Check localStorage
       ↓
Is there saved data?
     /     \
   Yes      No
    ↓        ↓
Parse it   []
    ↓
todos array
```

If there is no saved data:

```js
todos = [];
```

If saved data exists, I convert it back into a JavaScript array/object using:

```js
JSON.parse()
```

---

# 6. Why `localStorage` Is Needed

Normally, if I refresh the page, JavaScript variables reset.

For example:

```js
const todos = [
    {
        text: "Study",
        completed: false
    }
];
```

After refreshing the page, this JavaScript state disappears.

I wanted the Todo List to remember my data.

So I used:

```js
localStorage
```

The browser stores this data locally.

The important thing to remember:

> `localStorage` stores data as strings.

Therefore, I can't directly store a JavaScript array/object.

I need JSON.

---

# 7. `JSON.stringify()` — Saving Data

When saving:

```js
localStorage.setItem(
    'todos',
    JSON.stringify(todos)
);
```

The process is:

```text
JavaScript Array/Object
        ↓
JSON.stringify()
        ↓
String
        ↓
localStorage
```

Example:

```js
[
    {
        text: "Study",
        completed: false
    }
]
```

becomes a JSON string.

---

# 8. `JSON.parse()` — Getting Data Back

When loading:

```js
const saved = localStorage.getItem('todos');

const todos = saved ? JSON.parse(saved) : [];
```

The reverse happens:

```text
localStorage string
        ↓
JSON.parse()
        ↓
JavaScript Array/Object
```

So:

```text
JSON.stringify()
      ↓
JavaScript → String

JSON.parse()
      ↓
String → JavaScript
```

This is something I should remember clearly.

---

# 9. `saveTodos()` Function

Instead of writing the localStorage code everywhere, I created:

```js
function saveTodos() {
    localStorage.setItem(
        'todos',
        JSON.stringify(todos)
    );
}
```

The purpose of this function is simple:

> Whenever my `todos` array changes, save the updated array.

I call it after:

* Adding a todo
* Completing a todo
* Editing a todo
* Deleting a todo

So the rule is:

```text
Change data
    ↓
saveTodos()
```

---

# 10. Creating a Todo Dynamically

The main function for displaying an individual todo is:

```js
function createTodoNode(todo, index)
```

I pass:

* `todo` → the current todo object
* `index` → its position inside the array

For example:

```js
todos = [
    {text: "Study", completed: false},
    {text: "DSA", completed: true}
]
```

When looping:

```text
todo = first object
index = 0

todo = second object
index = 1
```

---

# 11. Creating the `<li>`

Inside `createTodoNode()`:

```js
const li = document.createElement("li");
```

This creates a new HTML element through JavaScript.

It is equivalent to creating:

```html
<li></li>
```

but I don't write it directly in HTML.

JavaScript creates it dynamically.

---

# 12. Creating the Checkbox

I create:

```js
const checkbox = document.createElement('input');

checkbox.type = 'checkbox';
```

Now JavaScript has created:

```html
<input type="checkbox">
```

I then connect its state to my todo object:

```js
checkbox.checked = !!todo.completed;
```

---

# 13. Understanding `!!`

This was something I specifically wanted to understand.

```js
!!todo.completed
```

The double `!!` converts a value into a proper boolean.

For example:

```text
!!true  → true
!!false → false
```

So:

```js
checkbox.checked = !!todo.completed;
```

makes sure the checkbox gets a boolean value.

If the todo is completed:

```js
todo.completed = true;
```

the checkbox becomes checked.

---

# 14. Detecting Checkbox Changes

I added:

```js
checkbox.addEventListener("change", () => {
```

This means:

> Run this function whenever the checkbox state changes.

Then:

```js
todo.completed = checkbox.checked;
```

I update the actual JavaScript object.

So if I click the checkbox:

```text
Checkbox clicked
      ↓
checkbox.checked changes
      ↓
todo.completed changes
      ↓
saveTodos()
```

This keeps the UI and data connected.

---

# 15. Creating the Todo Text

I create:

```js
const textSpan = document.createElement("span");
```

Then:

```js
textSpan.textContent = todo.text;
```

So if:

```js
todo.text = "Study JavaScript";
```

the browser displays:

```text
Study JavaScript
```

I also add:

```js
textSpan.style.margin = '0 8px';
```

to give some spacing around the text.

---

# 16. Showing Completed Todos

When loading/rendering a todo, I check:

```js
if(todo.completed) {
    textSpan.style.textDecoration = 'line-through';
}
```

So:

```text
completed = false
        ↓
normal text

completed = true
        ↓
line-through
```

Then when the checkbox changes:

```js
textSpan.style.textDecoration =
    todo.completed ? 'line-through' : "";
```

This uses the **ternary operator**.

The structure is:

```text
condition ? valueIfTrue : valueIfFalse
```

So:

```js
todo.completed
    ? 'line-through'
    : ''
```

means:

> If completed, use line-through; otherwise use nothing.

---

# 17. Editing a Todo

I wanted the user to be able to edit a todo by double-clicking its text.

So I used:

```js
textSpan.addEventListener("dblclick", () => {
```

The important thing I learned here is that the event name is:

```js
"dblclick"
```

not:

```js
"dbclick"
```

Then I use:

```js
const newText = prompt("Edit todo", todo.text);
```

The existing todo text is shown inside the prompt.

If the user cancels:

```js
newText === null
```

so I don't change anything.

If the user enters something:

```js
if(newText !== null) {
```

I update:

```js
todo.text = newText.trim();
```

Then:

```js
textSpan.textContent = todo.text;
```

updates what I see on the page.

Finally:

```js
saveTodos();
```

saves the updated version.

---

# 18. Why `.trim()` Is Used

I use:

```js
newText.trim()
```

and:

```js
input.value.trim()
```

because I don't want useless spaces.

For example:

```text
"   Study JavaScript   "
```

becomes:

```text
"Study JavaScript"
```

It also helps prevent an input containing only spaces from being accepted.

---

# 19. Delete Button

For every todo, I create:

```js
const delBtn = document.createElement('button');
```

Then:

```js
delBtn.textContent = "Delete";
```

Now I have a Delete button for each todo.

When clicked:

```js
delBtn.addEventListener('click', () => {
```

I remove that todo from the main array:

```js
todos.splice(index, 1);
```

This is important:

```text
todo     → one object
todos    → entire array
```

Therefore I need:

```js
todos.splice()
```

not:

```js
todo.splice()
```

---

# 20. Understanding `splice()`

```js
todos.splice(index, 1);
```

means:

> Starting at `index`, remove `1` element.

Example:

```js
todos = ["A", "B", "C"];
```

If:

```js
index = 1;
```

then:

```js
todos.splice(1, 1);
```

removes `"B"`.

Result:

```js
["A", "C"]
```

---

# 21. Why `render()` Is Called After Delete

After deleting:

```js
todos.splice(index, 1);
```

the data has changed.

But changing the JavaScript array doesn't automatically change the HTML.

So I call:

```js
render();
```

This rebuilds the visible list from the updated array.

Then:

```js
saveTodos();
```

stores the new array.

The flow is:

```text
Delete clicked
      ↓
Remove object from todos[]
      ↓
render()
      ↓
Update HTML
      ↓
saveTodos()
      ↓
Update localStorage
```

---

# 22. The `render()` Function

This is one of the most important functions in the project.

```js
function render() {
    ul.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);

        ul.appendChild(node);
    });
}
```

The first thing:

```js
ul.innerHTML = '';
```

clears the current list.

Then:

```js
todos.forEach(...)
```

goes through every todo.

For each todo:

```js
createTodoNode(todo, index)
```

creates the corresponding HTML.

Then:

```js
ul.appendChild(node);
```

adds it to the page.

---

# 23. The Important Mental Model of `render()`

I should remember:

> The `todos` array is my source of truth. The HTML is generated from it.

So:

```text
             todos[]
                ↓
             render()
                ↓
        createTodoNode()
                ↓
             DOM/HTML
```

If the data changes:

```text
Change todos[]
      ↓
render()
      ↓
New HTML
```

This is a very important pattern for future JavaScript applications.

---

# 24. Adding a New Todo

The function:

```js
function addTodo()
```

handles adding a new todo.

First:

```js
const text = input.value.trim();
```

gets the text from the input.

Then:

```js
if(!text) {
    return;
}
```

prevents an empty todo from being added.

Then I create a new object:

```js
todos.push({
    text,
    completed: false
});
```

The shorthand:

```js
{text}
```

means:

```js
{text: text}
```

So if the user enters:

```text
Study JavaScript
```

the object becomes:

```js
{
    text: "Study JavaScript",
    completed: false
}
```

---

# 25. Clearing the Input

After adding:

```js
input.value = '';
```

clears the input box.

So the user can immediately type the next todo.

---

# 26. Re-rendering After Adding

After adding the object:

```js
todos.push(...)
```

I need to update the screen.

So:

```js
render();
```

Then:

```js
saveTodos();
```

The flow is:

```text
User enters text
       ↓
input.value
       ↓
Create todo object
       ↓
todos.push()
       ↓
render()
       ↓
saveTodos()
```

---

# 27. Add Button Event

I connect the Add button to `addTodo()`:

```js
btn.addEventListener('click', addTodo);
```

So:

```text
Click Add
   ↓
addTodo()
```

I don't write:

```js
btn.addEventListener('click', addTodo());
```

because that would call the function immediately instead of passing the function as the event handler.

---

# 28. Enter Key

I also wanted Enter to add the todo.

So I use:

```js
input.addEventListener('keydown', (event) => {

    if(event.key === 'Enter') {
        addTodo();
    }

});
```

The logic:

```text
Key pressed
    ↓
Is key === Enter?
    ↓
   Yes
    ↓
addTodo()
```

This is another example of event handling.

---

# 29. Initial `render()`

At the bottom:

```js
render();
```

This is important.

When the page loads:

```text
localStorage
     ↓
todos[]
     ↓
render()
     ↓
Display saved todos
```

Without the initial `render()`, the data could exist in `todos`, but the page wouldn't display it until another action happened.

---

# 30. Complete Application Flow

This is the most important section for revision.

### When the page loads:

```text
HTML loads
    ↓
JavaScript loads
    ↓
Get input/button/list elements
    ↓
Read localStorage
    ↓
JSON.parse()
    ↓
Create todos array
    ↓
render()
    ↓
Display saved todos
```

### When I add a todo:

```text
Enter text
    ↓
Click Add / Press Enter
    ↓
addTodo()
    ↓
input.value.trim()
    ↓
Create object
    ↓
todos.push()
    ↓
render()
    ↓
saveTodos()
```

### When I complete a todo:

```text
Click checkbox
    ↓
change event
    ↓
todo.completed = checkbox.checked
    ↓
Change text decoration
    ↓
saveTodos()
```

### When I edit:

```text
Double-click text
    ↓
prompt()
    ↓
Update todo.text
    ↓
Update textSpan
    ↓
saveTodos()
```

### When I delete:

```text
Click Delete
    ↓
todos.splice(index, 1)
    ↓
render()
    ↓
saveTodos()
```

---

# 31. Concepts I Practiced

## DOM Manipulation

```js
document.getElementById()
document.createElement()
appendChild()
innerHTML
textContent
```

---

## Events

```js
addEventListener()
```

with:

```text
click
change
dblclick
keydown
```

---

## Arrays

```js
push()
splice()
forEach()
length
```

---

## Objects

A todo is represented as:

```js
{
    text: "...",
    completed: false
}
```

---

## JSON

```js
JSON.stringify()
JSON.parse()
```

---

## Local Storage

```js
localStorage.getItem()
localStorage.setItem()
```

---

## Functions

I separated responsibilities into:

```text
saveTodos()
createTodoNode()
render()
addTodo()
```

This makes the code easier to understand and maintain.

---

# 32. Bugs I Encountered While Building/Debugging

These mistakes are useful for revision because they show the difference between understanding the logic and just remembering syntax.

### Wrong array for `splice()`

I initially wrote:

```js
todo.splice(index, 1);
```

But `todo` represents one object.

Correct:

```js
todos.splice(index, 1);
```

---

### Wrong event name

I initially wrote:

```js
"dbclick"
```

Correct:

```js
"dblclick"
```

---

### Wrong input property

I initially wrote:

```js
input.ariaValueMax
```

Correct:

```js
input.value
```

The value typed by the user is available through:

```js
input.value
```

---

### Wrong variable name

I created:

```js
const btn = ...
```

but later tried:

```js
addbtn.addEventListener(...)
```

The variable I actually created was:

```js
btn
```

So the correct code is:

```js
btn.addEventListener('click', addTodo);
```

---

### Extra space in event name

I initially had:

```js
'click '
```

Correct:

```js
'click'
```

Event names must match exactly.

---

# 33. What I Should Understand Instead of Memorizing

The most important thing from this project isn't memorizing the entire code.

I should understand this architecture:

```text
             DATA
              ↓
           todos[]
              ↓
       ┌──────┴──────┐
       ↓             ↓
    render()      saveTodos()
       ↓             ↓
      DOM       localStorage
       ↓             ↓
      UI          Persistence
```

The array is the central data.

The DOM displays the data.

`localStorage` remembers the data.

User actions modify the data.

Then I re-render or update the UI.

---

# 34. What I Learned From CodeWithHarry

I followed the CodeWithHarry project to understand how a simple JavaScript application is structured.

The important takeaway for me isn't:

> "I made a Todo List."

It is:

> "I learned how to connect user actions → JavaScript state → DOM → persistent browser storage."

This project is a useful stepping stone before building larger JavaScript applications because the same basic pattern appears again and again:

```text
User Interaction
       ↓
Event Listener
       ↓
JavaScript Logic
       ↓
State/Data Change
       ↓
UI Update
       ↓
Persistence (when required)
```

That is the main idea I want to remember when I come back to revise this project.
