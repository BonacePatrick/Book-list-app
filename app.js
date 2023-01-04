// Book constructor
function Book (title,author,isbn) {

    this.title = title
    this.author = author
    this.isbn = isbn

}

// UI Constructor

function UI () {}

// Add book to list
UI.prototype.addBookToList = (book) => {
    
    //Grab book list
    const list = document.getElementById('book-list')

    //Create element 
    const row = document.createElement('tr')

    //Insert cols
    row.innerHTML = 
    `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class="delete">x</a></td>
    `
    list.appendChild(row)
}

// Show alert 

UI.prototype.showAlert = (message,className) => {
    //create div
    const div = document.createElement('div')

    //Add class

    div.className = `alert ${className}`

    //Add text

    div.appendChild(document.createTextNode(message))

    //Get parent 

    const container = document.querySelector('.container')

    //get form 

    const form  = document.querySelector('#book-form')

    //Insert alert 
    container.insertBefore(div,form)

    //Time out after 3sec
    setTimeout(()=>{
        document.querySelector('.alert').remove()
    }, 3000)
}

//Delete Book 
UI.prototype.deleteBook = (target) => {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()

    }
}

//Clear field

UI.prototype.clearFields = () => {

    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

//



//Event listener for add book

document.getElementById('book-form').addEventListener('submit' ,(e) => {

    //Get form values

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    //Instantiate book
    const book = new Book(title,author,isbn)

    //Instantiate UI

    const ui = new UI()

    //Validate 

    if(title === ''|| author === '' || isbn === '') {

        ui.showAlert('Please fill all the fields', 'error')

    } else {
        //Add book to list 
        ui.addBookToList(book)

        //Show success
        ui.showAlert('Book added successfully', 'success')


        //clear field

        ui.clearFields()
    }

    


    e.preventDefault()
    
})

// Add event listener for delete

document.getElementById('book-list').addEventListener('click', (e) => {

    
    //Instantiate UI

    const ui = new UI()


    //delete book

    ui.deleteBook(e.target)

    //show message

    ui.showAlert('Book removed successfully', 'success')

    e.preventDefault()

})

