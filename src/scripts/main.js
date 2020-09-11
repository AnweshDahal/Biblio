const { ipcRenderer } = require('electron'); // importing ipcRenderer from the 'electron' module

// Global Variables
var authors = []; // list of authors
var hasCorporateAuthor = false; // for checking wether the source has a corporate author


// Cleans the form
function cleanForm() {
  // sets the value of each input element to ""
  var inputs = document.querySelectorAll('input[type="text"');
  inputs.forEach((elem) => {
    elem.innerHTML = "";
  });

  // sets the display of all optional elements to none
  // hides the optional elements
  var optionals = document.querySelectorAll(".op");
  optionals.forEach((elem) => {
    elem.style.display = "none";
  });
}

// Toggles Corporate Author Entry
function enableCorpAuthor(e) {
  if (e.checked) {
    // if corporate author checkbox is checked
    document.querySelector('#authorFirstName').disabled = true;
    document.querySelector('#authorMiddleName').disabled = true;
    document.querySelector('#authorLastName').disabled = true;
    document.querySelector('#addAuthor').disabled = true;
    document.querySelector('#corpAuthor').disabled = false;
    hasCorporateAuthor = true;
  } else {
    // if corporate author checkox is not checked
    document.querySelector('#authorFirstName').disabled = false;
    document.querySelector('#authorMiddleName').disabled = false;
    document.querySelector('#authorLastName').disabled = false;
    document.querySelector('#addAuthor').disabled = false;
    document.querySelector('#corpAuthor').disabled = true;
    hasCorporateAuthor = false;
  }
}

// Updates form according to style and source
function updateForm(elem) {
  let source = elem.value; // value of source from the dropdown
  if (source == "book") {
    cleanForm();
    setBook();
  } else if (source == "journal") {
    cleanForm();
    setJournal();
  } else if (source == "website") {
    cleanForm();
    setWebsite();
  } else {
    cleanForm();
  }
}

// Sets up the form for books
function setBook() {
  document.querySelector('#fgTitle').style.display = "block";
  document.querySelector('#fgCity').style.display = "block";
  document.querySelector('#fgPublisher').style.display = "block";
  document.querySelector('#fgEdition').style.display = "block";
}

// Sets up the form for journals
function setJournal() {
  document.querySelector('#fgTitle').style.display = "block";
  document.querySelector('#fgJournalName').style.display = "block";
  document.querySelector('#fgPages').style.display = "block";
  document.querySelector('#fgVolume').style.display = "block";
  document.querySelector('#fgIssue').style.display = "block";
}

// Sets up the form for websites
function setWebsite() {
  document.querySelector('#fgWebPageName').style.display = "block";
  document.querySelector('#fgYearAccessed').style.display = "block";
  document.querySelector('#fgMonthAccessed').style.display = "block";
  document.querySelector('#fgDayAccessed').style.display = "block";
  document.querySelector('#fgURL').style.display = "block";
}

// adds new author to the authors list
function addNewAuthor() {
  let currFirstName, currMiddleName, currLastName = ""; // initializing the variable to be included

  // getting the value from the HTML
  currFirstName = document.querySelector("#authorFirstName").value;
  currMiddleName = document.querySelector("#authorMiddleName").value;
  currLastName = document.querySelector("#authorLastName").value;

  // check if the first & last name of the author is provided
  if (currFirstName == "" && currLastName == "") {
    alert("Invalid Author Name");
    return null;
  }

  // an object that stores the author name seperately
  let currAuthor = {
    'lastName': currLastName,
    'firstName': currFirstName,
    'middleName': currMiddleName
  }

  authors.push(currAuthor); // adding the author object to the authors list

  // emptying the text input 
  document.querySelector("#authorFirstName").value = "";
  document.querySelector("#authorMiddleName").value = "";
  document.querySelector("#authorLastName").value = "";

  let tempAuthor = ""; // initialing a variable for concatinated list of authors
  authors.forEach((author) => {
    if (author['middleName'] != "") {
      tempAuthor += `${author['lastName']}, ${author['firstName'][0]}.${author['middleName'][0]}.,`;
    } else {
      tempAuthor += `${author['lastName']}, ${author['firstName'][0]}.,`;
    }
  });

  document.querySelector("#authors").innerHTML = tempAuthor; // displaying the names of the authors
}

// generates the citation and bibliography
function generate() {
  let refStyle = document.querySelector("#refStyle").value; // the reference style
  let refMaterial = document.querySelector("#refMaterial").value; // the reference material

  // checks if reference style and reference material are empty
  // alerts the user if so
  if (refStyle == "" && refMaterial != "") {
    alert("Please select a valid referencing format.");
    return null;
  } else if (refMaterial == "" && refStyle != "") {
    alert("Please select a valid reference material.");
    return null;
  } else if (refStyle == "" && refMaterial == "") {
    alert("Please select a valid reference material and source.");
    return null;
  }

  let year = document.querySelector("#year").value; // gets the value of the year from the HTML

  generateCitetation(year, refMaterial); // calling the function to generate citetation

  // generating bibliography
  if (refMaterial == "book") {
    // if the source is a book
    generateBookBibliography(year)
  } else if (refMaterial == "journal") {
    // if the source is a journal
    generateJournalBibliography(year);
  }
}

// function to generate citetation
function generateCitetation(year, refMaterial) {
  let citeAuthor = ""; // temporary variable for storing author name

  if (!hasCorporateAuthor && (authors.length > 3)) { // if there are more than 3 authors
    citeAuthor = `${authors[0]['lastName']} et al.`;
  } else if (!hasCorporateAuthor && (authors.length == 3)) { // if there are three authors
    citeAuthor = `${authors[0]['lastName']}, ${authors[1]['lastName']} and ${authors[2]['lastName']}`;
  } else if (!hasCorporateAuthor && (authors.length == 2)) { // if there are two authors
    citeAuthor = `${authors[0]['lastName']} & ${authors[1]['lastName']}`;
  } else if (!hasCorporateAuthor && authors.length == 1) { // if there is one author
    if (authors[0]['lastName'] == null || authors[0]['lastName'] == "") {
      citeAuthor = authors[0]['firstName'];
    } else {
      citeAuthor = authors[0]['lastName'];
    }
  } else if (hasCorporateAuthor) { // if thee is a corporate author
    citeAuthor = document.querySelector("#corpAuthor").value;
  } else { // if there is no author
    if (refMaterial == "book" || refMaterial == "journal") {
      citeAuthor = document.querySelector("#title").value;
    } else if (refMaterial == "webSite") {
      citeAuthor = document.querySelector("#webPageTitle").value;
    }
  }

  if (year == "" || year == null) { // if the year is not provided
    year = "n.d.";
  }

  var cite = `(${citeAuthor}, ${year})`; // formatted string for citetation
  document.querySelector("#inCite").innerHTML = cite; // displaying the citetation
}

// function to generate journal bibliography
function generateJournalBibliography(year) {
  let journalAuthor = "";
  if (hasCorporateAuthor) {
    journalAuthor = document.querySelector("#corpAuthor").value;
  } else {
    for (let i = 0; i < authors.length; i++) {
      journalAuthor += getCurrentBibliographyAuthor(i);
    }
  }

  let journalTitle = document.querySelector('#title').value;
  let journalName = document.querySelector('#journalName').value;
  let pages = document.querySelector("#pages").value;
  let volume = document.querySelector("#volume").value;
  let issue = document.querySelector("#issue").value;


}

// function to generate book bibliography
function generateBookBibliography(year) {
  let bookAuthor = "";
  if (hasCorporateAuthor) {
    bookAuthor = document.querySelector("#corpAuthor").value;
  } else {
    for (let i = 0; i < authors.length; i++) {
      bookAuthor += getCurrentBibliographyAuthor(i);
    }
  }

  // console.log(bookAuthor);
  let bookTitle = document.querySelector("#title").value;
  let bookCity = document.querySelector("#city").value;
  let bookPublisher = document.querySelector("#publisher").value;
  let bookEdition = document.querySelector("#edition").value;

  let bookBibliography = `${bookAuthor}${year}. <em>${bookTitle}</em>. ${bookEdition}. ${bookCity}: ${bookPublisher}`;

  console.log(bookBibliography);
  document.querySelector("#bib").innerHTML = bookBibliography;
}

function getCurrentBibliographyAuthor(index) {
  let author = authors[index];
  let fName = author['firstName'];
  let mName = author['middleName'];
  let lName = author['lastName'];

  let currAuthor = "";

  if (index != (authors.length - 1)) {
    if (mName == "" || mName == null) {
      currAuthor = `${lName}, ${fName[0]}., `;
    } else {
      currAuthor = `${lName}, ${fName[0]}.${mName[0]}, `;
    }
  } else {
    if (mName == "" || mName == null) {
      currAuthor = `and ${lName}, ${fName[0]}., `;
    } else {
      currAuthor = `and ${lName}, ${fName[0]}.${mName[0]}, `;
    }
  }

  return currAuthor;
}

// function to reset the form
function reset() {
  ipcRenderer.send('reset_form');
}
