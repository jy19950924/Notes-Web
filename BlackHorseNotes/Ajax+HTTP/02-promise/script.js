
const bookUrl = 'http://www.liulongbin.top:3006';

function getBooks() {
    // function () {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${bookUrl}/api/getbooks`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve.call(undefined, xhr.responseText);
            } else {
                reject.call(undefined, xhr.responseText);
            }
        }
        xhr.send();
    });
}
// https://juejin.cn/post/6968796449618264072
function addBook(formdate) {
    return new Promise((resolve, reject) => {
        let fd = new FormData(formdate)
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${bookUrl}/api/addbook`);
        xhr.send(fd);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(JSON.parse(xhr.responseText));
            }
        }
    });
}
let bookList = getBooks();
bookList.then((response) => {
    let booksList = response.data;
    // let table = document.querySelector('table');

    console.log(booksList);

}).catch((error) => {

    console.log("error:" + error);
});