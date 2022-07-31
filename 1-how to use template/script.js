// 
let tt = document.querySelector('template')
console.log('tt', tt)

let newTemplate = document.createElement('template')
console.log('newTemplate', newTemplate)

document.body.appendChild(newTemplate)
let tt1 = document.querySelectorAll('template')
console.log('tt1', tt1)

// 发现document可以直接使用appendChild
console.log('document', document)  // tag html

// -----------------以下为导入方式-----------------

// 通过检查来测试浏览器是否支持 HTML 模板元素
// 用于保存模板元素的内容属性。
if ('content' in document.createElement('template')) {

    // 使用现有的 HTML tbody 实例化表和该行与模板
    let t = document.querySelector('#productrow'),
        td = t.content.querySelectorAll("td");

    console.log('t', t)
    console.log('t.content', t.content)
    td[0].textContent = "1235646565";
    td[1].textContent = "Stuff";

    // 克隆新行并将其插入表中
    let tb = document.getElementsByTagName("tbody");
    let clone = document.importNode(t.content, true);
    tb[0].appendChild(clone);

    // 创建一个新行
    td[0].textContent = "0384928528";
    td[1].textContent = "Acme Kidney Beans";

    // 克隆新行并将其插入表中
    let clone2 = document.importNode(t.content, true);
    tb[0].appendChild(clone2);

} else {
    // 找到另一种方法来添加行到表，因为不支持 HTML 模板元素。
}
