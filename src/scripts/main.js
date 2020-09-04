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
    document.querySelector('#authorName').disabled = true;
    document.querySelector('#corpAuthor').disabled = false;
  } else {
    document.querySelector('#authorName').disabled = false;
    document.querySelector('#corpAuthor').disabled = true;
  }
}

// Updates form according to style and source
function updateForm(elem) {
  let source = elem.value;
  if (source == "book") {
    cleanForm();
  } else if (source == "journal") {
    cleanForm();
  } else if (source == "website") {
    cleanForm();
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

// generates the citation
function generate() {
  let refStyle = document.querySelector("#refStyle").value;
  let refMaterial = document.querySelector("#refMaterial").value;

  if (refStyle == "") {
    alert("Please select a valid referencing format.");
    return null;
  }

  if (refMaterial == "") {
    alert("Please select a valid reference material.");
    return null;
  }

  let author = "";
  let year = document.querySelector("#year").value;
  let title = document.querySelector("#title").value;
  let webPageTitle = document.querySelector("#webPageTitle").value;

  // Getting Author
  var arrayAuthor = true;
  let hasCorporateAuthor = document.querySelector("#corpAuthorCB").checked;
  if (hasCorporateAuthor) {
    author = document.querySelector("#corpAuthor").value;
    // console.log(author);
    arrayAuthor = false;
  } else {
    author = [];
    let tempAuthors = document.querySelector('#authorName').value;
    tempAuthors = tempAuthors.split(";");
    tempAuthors.forEach((item) => {
      item = item.split(',');
      author.push(item);
    });
    // console.log(author);
  }
  console.log(year);
  let citeAuthor = "";
  console.log(author.length);

  if (arrayAuthor && (author.length > 3)) {
    citeAuthor = author[0][0] + " et al";
  } else if (arrayAuthor && (author.length == 3)) {
    citeAuthor = `${author[0][0]}, ${author[1][0]} and ${author[2][0]}`;
  } else if (arrayAuthor && (author.length == 2)) {
    citeAuthor = author[0][0] + " & " + author[1][0];
  } else if (arrayAuthor && author.length == 1) {
    citeAuthor = author[0][0];
  } else if (!arrayAuthor) {
    citeAuthor = author;
  } else {
    if (refMaterial == "book" || refMaterial == "journal") {
      citeAuthor = document.querySelector("#title");
    } else if (refMaterial == "webSite") {
      citeAuthor = document.querySelector("#webPageTitle");
    }
  }

  if (year == "" || year == null) {
    year = "n.d.";
  }

  var cite = `(${citeAuthor}, ${year})`;
  document.querySelector("#inCite").innerHTML = cite;

  if (refMaterial == "book") {
    generateBookBibliography(citeAuthor, year)
  } else if (refMaterial == "journal") {
    var journalTitle = document.querySelector('#title').value;
    var journalName = document.querySelector('#journalName');
    var pages = document.querySelector("#pages");
  }
}

function generateBookBibliography(author, year) {
  let bookTitle = document.querySelector("#title").value;
  let bookCity = document.querySelector("#city").value;
  let bookPublisher = document.querySelector("#publisher").value;
  let bookEdition = document.querySelector("#edition");
}
