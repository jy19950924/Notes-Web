
let addButton = document.getElementById('add');
let deleteButton = document.getElementById('delete');
let table = document.querySelector('table');



function getBooksList() {
    const booksUrl = 'http://www.liulongbin.top:3006';
    let getBooks = new XMLHttpRequest();
    getBooks.open('GET', `${booksUrl}/api/getbooks`);
    getBooks.send();
    getBooks.onreadystatechange = function () {
        if (getBooks.readyState === 4 && getBooks.status === 200) {
            const books = JSON.parse(getBooks.responseText).data;
            // console.log(books)
            books.forEach(book => {
                // console.log(book)
                table.insertRow();
                let len = table.rows.length;
                for (let i = 0; i < dataRange; i++) {
                    table.rows[len - 1].insertCell();
                    table.rows[len - 1].cells[i].innerText = Object.values(book)[i];
                }
            });
        }
    }
}
getBooksList();

const dataRange = 4;

addButton.addEventListener('click', function () {

    console.log(table.insertRow());
    let len = table.rows.length;
    for (let i = 0; i < dataRange; i++) {
        table.rows[len - 1].insertCell();
        table.rows[len-1 ].insertCell
    }
    console.log(table.rows[len - 1].cells[0].contentEditable)

}, false);

deleteButton.addEventListener('click', function () {
    console.log("delete");
}, false);

