const { ipcRenderer } = require('electron');

// Global Variables
var authors = [];
var hasCorporateAuthor = false;


// Cleans the form
function cleanForm() {
  var inputs = document.querySelectorAll('input[type="text"');
  inputs.forEach((elem) => {
    elem.innerHTML = "";
  });
  var optionals = document.querySelectorAll(".op");
  optionals.forEach((elem) => {
    elem.style.display = "none";
  });
}

// Toggles Corporate Author Entry
function enableCorpAuthor(e) {
  if (e.checked) {
    document.querySelector('#authorFirstName').disabled = true;
    document.querySelector('#authorMiddleName').disabled = true;
    document.querySelector('#authorLastName').disabled = true;
    document.querySelector('#addAuthor').disabled = true;
    document.querySelector('#corpAuthor').disabled = false;
    hasCorporateAuthor = true;
  } else {
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
  let source = elem.value;
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

function addNewAuthor() {
  let currFirstName, currMiddleName, currLastName = "";

  currFirstName = document.querySelector("#authorFirstName").value;
  currMiddleName = document.querySelector("#authorMiddleName").value;
  currLastName = document.querySelector("#authorLastName").value;

  if (currFirstName == "" && currLastName == "") {
    alert("Invalid Author Name");
    return null;
  }

  let currAuthor = {
    'lastName': currLastName,
    'firstName': currFirstName,
    'middleName': currMiddleName
  }

  authors.push(currAuthor);

  document.querySelector("#authorFirstName").value = "";
  document.querySelector("#authorMiddleName").value = "";
  document.querySelector("#authorLastName").value = "";

  let tempAuthor = "";
  authors.forEach((author) => {
    if (author['middleName'] != "") {
      tempAuthor += `${author['lastName']}, ${author['firstName'][0]}.${author['middleName'][0]}.,`;
    } else {
      tempAuthor += `${author['lastName']}, ${author['firstName'][0]}.,`;
    }
  });
  // console.log(tempAuthor);
  document.querySelector("#authors").innerHTML = tempAuthor;
}

// generates the citation and bibliography
function generate() {
  let refStyle = document.querySelector("#refStyle").value;
  let refMaterial = document.querySelector("#refMaterial").value;

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

  let year = document.querySelector("#year").value;

  generateCitetation(year, refMaterial);

  if (refMaterial == "book") {
    generateBookBibliography(year)
  } else if (refMaterial == "journal") {
    var journalTitle = document.querySelector('#title').value;
    var journalName = document.querySelector('#journalName');
    var pages = document.querySelector("#pages");
  }
}

function generateCitetation(year, refMaterial) {
  let citeAuthor = "";

  if (!hasCorporateAuthor && (authors.length > 3)) {
    citeAuthor = `${authors[0]['lastName']} et al.`;
  } else if (!hasCorporateAuthor && (authors.length == 3)) {
    citeAuthor = `${authors[0]['lastName']}, ${authors[1]['lastName']} and ${authors[2]['lastName']}`;
  } else if (!hasCorporateAuthor && (authors.length == 2)) {
    citeAuthor = `${authors[0]['lastName']} & ${authors[1]['lastName']}`;
  } else if (!hasCorporateAuthor && authors.length == 1) {
    if (authors[0]['lastName'] == null || authors[0]['lastName'] == "") {
      citeAuthor = authors[0]['firstName'];
    } else {
      citeAuthor = authors[0]['lastName'];
    }
  } else if (hasCorporateAuthor) {
    citeAuthor = document.querySelector("#corpAuthor").value;
  } else {
    if (refMaterial == "book" || refMaterial == "journal") {
      citeAuthor = document.querySelector("#title").value;
    } else if (refMaterial == "webSite") {
      citeAuthor = document.querySelector("#webPageTitle").value;
    }
  }

  if (year == "" || year == null) {
    year = "n.d.";
  }

  var cite = `(${citeAuthor}, ${year})`;
  document.querySelector("#inCite").innerHTML = cite;
}

function generateBookBibliography(year) {
  let bookTitle = document.querySelector("#title").value;
  let bookCity = document.querySelector("#city").value;
  let bookPublisher = document.querySelector("#publisher").value;
  let bookEdition = document.querySelector("#edition");
}

function reset() {
  ipcRenderer.send('reset_form');
}
