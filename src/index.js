// import pic from './1.jpg'
// import "@babel/polyfill";//babel的依赖
import index from'./index.scss'
import './style.css'

// var img = new Image()
// img.src = pic
// img.classList.add('avatar')

//Tree Shaking 只支持 ES Module 可以在package.json中设置sideEffects忽略tree shaking动作
import { add } from './math.js'

var root = document.getElementById('root');
// root.append(img);
root.innerHTML = `<div class="${index.iconfont} ${index['icon-ziyuan']}"></div>`

var btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.append(btn)
btn.onclick = function() {
  var div = document.createElement('div')
  div.innerHTML = 'item'
  document.body.append(div)
}

add(1,6)