class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const tr = document.createElement('tr');
    const tdTitle = document.createElement('td');
    tdTitle.appendChild(document.createTextNode(book.title));
    const tdAuthor = document.createElement('td');
    tdAuthor.appendChild(document.createTextNode(book.author));
    const tdIsbn = document.createElement('td');
    tdIsbn.className = 'isbn';
    tdIsbn.appendChild(document.createTextNode(book.isbn));
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdIsbn);
    const tdRemove = document.createElement('td');
    tdRemove.innerHTML = '<a href="#" class="delete">X</a>';
    tr.appendChild(tdRemove);
    list.appendChild(tr);
  }
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function() {
      div.remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.classList.contains('delete')) {
      let isbn = target.closest('tr').querySelector('td.isbn').textContent;
      Store.removeBook(isbn);
      target.closest('tr').remove();
    }
  }
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books = localStorage.getItem('books');
    if (books !== null) {
      books = JSON.parse(books);
    }
    else {
      books = [];
    }
    return books;
  }
  static displayBooks() {
    let books = Store.getBooks();
    let ui = new UI();
    for(let i in books) {
      ui.addBookToList(books[i]);
    }
  }
  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    let books = Store.getBooks();
    for(let i = 0; i < books.length; i++) {
      if (books[i].isbn === isbn) {
        books.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  //instantiate book
  const book = new Book(title, author, isbn);
  //instantiate ui
  const ui = new UI();
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields.', 'error')
  }
  else {
    Store.addBook(book);
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book Added!', 'success')
  }
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e) {
  let ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function(e) {
  Store.displayBooks();
});

