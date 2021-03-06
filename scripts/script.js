var xml = new XMLHttpRequest();
var xmlDocument;

//request to open file
xml.open("POST", "xml/books.xml");
//return the response as a DOM tree
xml.responseType = "document";
//send the request
xml.send();

//Placing onload instructions after document request
xml.onload = function () {
  xmlDocument = xml.responseXML;
  //console.log(xmlDocument);
  document.getElementById("tBody").innerHTML = xmlDocument.documentElement.nodeName;
  generateTable();

  //Listen and prevent the form from sending
  document.forms.bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    createBook();
    generateTable();
    console.log("test");
  });
}


//Listen for an xml error, fire this function
xml.onerror = function () {
  console.log("Error while loading XML...");
}

function generateTable() {
  //Capture the XML element 'book'
  var book = xmlDocument.getElementsByTagName("book");
  //Declare an empty string for a table row to be
  var tRow = '';
  //Loop through the xml books and
  for (let i = 0; i < book.length; i++) {
    //A variable to hold value of the id element
    let id = book[i].getElementsByTagName("id")[0].textContent;
    //A var to hold the 'title' value
    let title = book[i].getElementsByTagName("title")[0].textContent;
    //A var to hold the book 'author' value
    let author = book[i].getElementsByTagName('author')[0];
    //A var to hold author 'title' attribute
    let authorTitle = author.getAttribute("title");
    //A var to hold the author 'firstname'
    let firstName = author.getElementsByTagName('firstname')[0].textContent;

    //An empty string to hold the middlename
    let middleName = '';
    //If there is a middle name, set it to the value, otherwise, keep it an empty string
    if(author.getElementsByTagName('middlename').length != 0) {
      middleName = author.getElementsByTagName('middlename')[0].textContent;
    }

    //A variable to store the content of the xml node 'lastname'
    let lastName = author.getElementsByTagName('lastname')[0].textContent;
    //Append this concatenated string to the tRow
    tRow += `<tr><td>${id}</td><td>${title}</td><td>${lastName}, ${authorTitle} ${firstName} ${middleName}</td></tr>`;
  }
  //Set the innerHTML of the table body to the value of tRow
  document.getElementById("tBody").innerHTML = tRow;
}

function createBook() {
  //Create a new XML element named 'book'.
  var newBook = xmlDocument.createElement("book");
  //Capture the book form as a variable
  var user_bookForm = document.forms.bookForm;
  //Capture all books in XML document model
  var allBooks = xmlDocument.getElementsByTagName("book");

  var newBookId = allBooks[allBooks.length-1];
  console.log(newBookId.childNodes[1]);


  //Create an id element
  var bookId = xmlDocument.createElement('id');
  //Set the id value to the newBookId value
  var dumbNode = xmlDocument.createTextNode('hello');
  newBook.appendChild(dumbNode);
  var newId = parseInt(newBookId.childNodes[1].textContent) + 1;
  newId = newId.toString().padStart(4, "0");
  var bookIdText = xmlDocument.createTextNode(newId);
  //Append the text node to the element
  bookId.appendChild(bookIdText);
  //Append the id to the newBook
  newBook.appendChild(bookId);


  //Create a child element named 'title'
  var bookTitle = xmlDocument.createElement("title");
  //Capture user inputted book title
  var user_bookTitle = user_bookForm.bookTitle.value;
  //Create a text node and populate it with the value of 'user_bookTitle'
  var bookTitleText = xmlDocument.createTextNode(user_bookTitle);
  //Attach the text node to the parent element
  bookTitle.appendChild(bookTitleText);
  //Append the book title element to the book parent.
  newBook.appendChild(bookTitle);


  //Create the parent author element
  var author = xmlDocument.createElement("author");
  //Capture form data for authorTitle field
  var user_authorTitle = user_bookForm.authorTitle.value;
  //Only create create and set an attribute if there is one
  if (user_authorTitle) {
    author.setAttribute('title', user_authorTitle);
  } else {
    author.setAttribute('title', "");
  }
  //Create the first child of author, 'First Name'
  var authorFirst = xmlDocument.createElement("firstname");
  //Capture the form data for the 'First Name'
  var user_authorFirst = user_bookForm.authorFirst.value;
  //Create a text node with the value of the firstname form data
  var authorFirstText = xmlDocument.createTextNode(user_authorFirst);
  //Append the text node to the element
  authorFirst.appendChild(authorFirstText);
  //Append the first name to the author parent
  author.appendChild(authorFirst);


  //Capture the form data for the middle name
  var user_authorMiddle = user_bookForm.authorMiddle.value;
  //If there is an middle name, do the following
  if (user_authorMiddle) {
    //Create a child element name middlename
    var authorMiddle = xmlDocument.createElement('middlename');
    //Create a text node with the data from the form
    var authorMiddleText = xmlDocument.createTextNode(user_authorMiddle);
    //Append the text node to the element
    authorMiddle.appendChild(authorMiddleText);
    //Append the element to the parent author
    author.appendChild(authorMiddle);
  }

  //Create a child of author named lastname
  var authorLast = xmlDocument.createElement('lastname');
  //Capture form data for last name
  var user_authorLast = user_bookForm.authorLast.value;
  //Create a text node with the form data
  var authorLastText = xmlDocument.createTextNode(user_authorLast);
  //Append the text node to the element
  authorLast.appendChild(authorLastText);
  //Append the authorLast to the author parent element
  author.appendChild(authorLast);
  //Append the author to the book
  newBook.appendChild(author);
  //Append the new book to the 'Books' root
  xmlDocument.documentElement.appendChild(newBook);

}