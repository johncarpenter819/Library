import { validateForm } from "./validation.js";
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleRead = function(){
    this.read = !this.read;
}
function toggleRead(index){
    myLibrary[index].toggleRead();
    render();
}
function render(){
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.setAttribute("class", "book-card");
        bookEl.innerHTML = `
        <div class="card-header">
            <h3 class="title">${book.title}</h3>
            <h5 class="author">by ${book.author}</h5>
        </div>
        <div class="card-body">
            <p>${book.pages} pages</p>
            <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">Toggle Read</button>
        </div>
        `;

        const removeBtn = bookEl.querySelector(".remove-btn");
        const toggleBtn = bookEl.querySelector(".toggle-read-btn");

        removeBtn.addEventListener("click",() => removeBook(i));
        toggleBtn.addEventListener("click", () => toogleRead(i));

        libraryEl.appendChild(bookEl);
    }
}

function removeBook(index){
    myLibrary.splice(index,1);
    render();
}

function addBookToLibrary() {
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    const readInput = document.querySelector("#read");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    const errors = validateForm(title, author, pages);

    if(errors.length > 0){
        alert(errors.join("\n"));
        return;
    }

    const newBook = new Book(title, author, Number(pages), read);
    myLibrary.push(newBook);
    render();

    document.querySelector("#new-book-form").reset();
    document.querySelector("#new-book-form").style.display = "none";
}
let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", function(){
    let newBookForm = document.querySelector("#new-book-form")
    newBookForm.style.display = "grid";
})

document.querySelector("#new-book-form").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
})