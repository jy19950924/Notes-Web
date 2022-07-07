
const bookUrl = 'http://www.liulongbin.top:3006';

function getBooks() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${bookUrl}/api/getbooks`);
        xhr.onreadystatechange = function (responseTe) {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(JSON.parse(xhr.responseText));
                }
            }
        }
        xhr.send();
    });
}

function addBook(formdate) {
    return new Promise((resolve, reject) => {

        let fd = new FormData(formdate)
        let fd1 = Object.fromEntries(fd.entries()) 

        let xhr = new XMLHttpRequest();
        // xhr.open('POST', `${bookUrl}/api/addbook`);
        xhr.open('POST', 'http://127.0.0.1:5000/test') 
        xhr.send(JSON.stringify(fd1))

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(JSON.parse(xhr.responseText));
                }
            } else if (xhr.readyState === 2) {
                console.log('xhr', xhr.getAllResponseHeaders())
            }
        }
    });
}
function drawTable(booksList) {
    let table = document.querySelector('table');
    booksList.forEach(book => {
        let newRow = table.insertRow();
        Object.values(book).forEach((value) => {
            let newCell = newRow.insertCell();
            newCell.innerText = value;
        })
    });
}

getBooks().then((response) => {
    let booksList = response.data;
    drawTable(booksList);
}).catch((error) => {
    console.log("error:" + error);
});

let submit = document.querySelector('button');
submit.addEventListener('click', function () {
    let addBookInfo = document.querySelector('form');
    addBook(addBookInfo).then(() => {
        getBooks().then((response) => {
            let booksList = response.data;
            drawTable(booksList);
        })
    }).catch((error) => {
        console.log('error', error);
    })
}, false)
