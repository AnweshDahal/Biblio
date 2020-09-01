function generate() {
  let author = "";
  let hasCorporateAuthor = document.querySelector("#corpAuthorCB").checked;
  if (hasCorporateAuthor) {
    author = document.querySelector("#corpAuthor").value;
    console.log(author);
  } else {
    author = [];
    let tempAuthors = document.querySelector('#authorName').value;
    tempAuthors = tempAuthors.split(";");
    tempAuthors.forEach((item) => {
      item = item.split(',');
      author.push(item);
    });
  }
}