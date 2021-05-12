//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const tr = document.createElement('tr');
  const tdTitle = document.createElement('td');
  tdTitle.appendChild(document.createTextNode(book.title));
  const tdAuthor = document.createElement('td');
  tdAuthor.appendChild(document.createTextNode(book.author));
  const tdIsbn = document.createElement('td');
  tdIsbn.appendChild(document.createTextNode(book.isbn));
  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdIsbn);
  const tdRemove = document.createElement('td');
  tdRemove.innerHTML = '<a href="#" class="delete">X</a>';
  tr.appendChild(tdRemove);
  list.appendChild(tr);
}

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {
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

UI.prototype.deleteBook = function(target) {
  if (target.classList.contains('delete')) {
    target.closest('tr').remove();
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
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book Added!', 'success')
  }
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e) {
  let ui = new UI();
  ui.deleteBook(e.target)
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});

