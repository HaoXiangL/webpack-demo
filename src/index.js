// import pic from './1.jpg'
import index from'./index.scss'
console.log('hello world')
// var img = new Image()
// img.src = pic
// img.classList.add('avatar')

var root = document.getElementById('root');
// root.append(img);
root.innerHTML = `<div class="${index.iconfont} ${index['icon-ziyuan']}"></div>`