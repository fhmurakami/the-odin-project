const book1 = {
  id: crypto.randomUUID(),
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 180,
  read: true,
};

let myLibrary = [book1];

const library = document.getElementById("library");
library.innerHTML = "";

const thead = document.createElement("thead");
const headerRow = document.createElement("tr");

thead.appendChild(headerRow);
library.appendChild(thead);

const tbody = document.createElement("tbody");
library.appendChild(tbody);

const form = document.createElement("form");
form.id = "form";

const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.id = "title";
titleInput.placeholder = "Title";
form.appendChild(titleInput);

const authorInput = document.createElement("input");
authorInput.type = "text";
authorInput.id = "author";
authorInput.placeholder = "Author";
form.appendChild(authorInput);

const pagesInput = document.createElement("input");
pagesInput.type = "number";
pagesInput.id = "pages";
pagesInput.placeholder = "Pages";
form.appendChild(pagesInput);

const readDiv = document.createElement("div");
readDiv.class = "read";

const readInput = document.createElement("input");
readInput.type = "checkbox";
readInput.id = "read";
readInput.name = "read";
readInput.checked = false;
readDiv.appendChild(readInput);

const readLabel = document.createElement("label");
readLabel.htmlFor = "read";
readLabel.textContent = "Read";
readDiv.appendChild(readLabel);

form.appendChild(readDiv);

const addButton = document.createElement("button");
addButton.textContent = "Add Book";
addButton.id = "add-book-to-library";
form.appendChild(addButton);

const formContainer = document.getElementById("form-container");
formContainer.appendChild(form);
document
  .getElementById("add-book-to-library")
  .addEventListener("click", addBookToLibrary);
document.getElementById("close-form").addEventListener("click", function () {
  toggleForm(false);
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

function renderLibrary(myLibrary) {
  const tableHeader = `
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Pages</th>
      <th>Read</th>
    </tr>
    `;

  const tableRows = myLibrary
    .map((book) => {
      return `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages} pages</td>
        <td>${book.read ? "Read" : "Not read yet"}</td>
      </tr>
    `;
    })
    .join("");

  const table = `
  <thead>${tableHeader}</thead>
  <tbody>${tableRows}</tbody>
  `;

  library.innerHTML = table;
}

function addToLibrary(library, book) {
  let newBook = new Book(book.title, book.author, book.pages, book.read);
  library.push(newBook);
  renderLibrary(library);
  toggleForm(false);
}

function addBookToLibrary(event) {
  event.preventDefault();
  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    pages: document.getElementById("pages").value,
    read: document.getElementById("read").checked,
  };
  addToLibrary(myLibrary, book);
}

function toggleForm(status) {
  const aside = document.querySelector("aside");
  const body = document.querySelector("body");
  // const form = document.getElementById("form");

  if (status) {
    formContainer.appendChild(form);
    aside.style.display = "flex";
    form.style.display = "flex";
    body.style.gridTemplateColumns = "2fr 1fr";
  } else {
    formContainer.removeChild(form);
    aside.style.display = "none";
    body.style.gridTemplateColumns = "1fr";
  }
}

toggleForm(false);
document.getElementById("add-book").addEventListener("click", function () {
  toggleForm(true);
});

renderLibrary(myLibrary);
