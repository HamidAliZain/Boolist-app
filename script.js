class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBook() {
    const books = Store.getBook();
    books.forEach((books) => UI.addBookToList(books));
  }
  static addBookToList(books) {
    const list = document.querySelector("#book-List");
    const row = document.createElement(`tr`);
    row.innerHTML = `
    <td  >${books.title}</td>
    <td>${books.author}</td>
    <td>${books.isbn}</td>
    <td class="text-red-400 text-xl"><a href="#" class="delete  ">X</a></td>
    `;

    list.appendChild(row);
  }
  static deletBooks(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(massage, className) {
    const div = document.createElement("div");
    div.classList = `alert text-white m-2 p-2  text-left w-1/2 mx-auto ${className}`;
    div.appendChild(document.createTextNode(massage));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1000);
  }
  static clearField() {
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
    document.querySelector("#isbn").value = " ";
  }
}
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem(`books`) === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
document.addEventListener("DOMContentLoaded", UI.displayBook);
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  if (title === "" && author === "" && isbn === "") {
    UI.showAlert("Please fill all the fields", "bg-red-600");
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearField();
    UI.showAlert("book added", "bg-blue-600 ");
  }
});
document.querySelector("#book-List").addEventListener("click", (e) => {
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.deletBooks(e.target);

  UI.showAlert("Book Removed", "bg-green-500");
});
