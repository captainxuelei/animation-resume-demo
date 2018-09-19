function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(()=>{
      
      n += 1
      domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
      styleTag.innerHTML = prefix + code.substring(0, n)
      domCode.scrollTop = domCode.scrollHeight
      if(n >= code.length){ 
        window.clearInterval(id)
        fn.call()
      }
    },50)
}

function writeMarkdown(markdown, fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){ 
            window.clearInterval(id)
            fn.call()
          }
    },50)
}

var result = `
/*面试官你好，
……
……
……
……
……
……
……
……
……
……
先添加一些样式
*/
*{
  transition: all 1s
}
body{
  background: rgb(222,222,222);
}
#code{
    border: 1px solid black;
    padding: 16px;
}
/*接下来将代码高亮*/
.token.selector{ color: #690; }
.token.property{ color: #905; }
.token.function{ color: #DD4A68; }

/*加点3D效果*/
#code{
    transform: rotate(360deg);
}
/*ok，我来介绍一下我自己吧*/
/*我需要一张白纸*/
#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
  }
#paper > .content {
    display: block;
}
`
var result2 = `
/* 把 Markdown 变成 HTML
 */
`
var md = `
# 自我介绍
xxx

# 技能介绍
1. xxx
2. xxx
3. xxx

# 项目介绍
1. xxx
2. xxx

# 联系方式
xxx
`
let result3 = `
/*
 * 这就是我的简历
 * 谢谢观看
 */
`

writeCode('', result, ()=>{
    createPaper(()=>{
        writeMarkdown(md, ()=>{
            writeCode(result, result2, ()=>{
                markdownToHTML(writeCode(result + result2, result3, ()=> {}))
            })
        })
    })
})



function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
 function markdownToHTML(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
 }