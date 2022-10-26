#一、web worker使用
$\color{#FF0000}{chrome浏览器默认禁止本地运行worker，需要在nginx下运行。}$
``` javaScript
index.html
// 创建worker线程
const myWorker = new Worker("work.js");
// 往worker线程发送数据
myWorker.postMessage({ data: array, type: "one" });
// 获取worker线程往主线程发送的数据
myWorker.onmessage = (e) => {
  document.getElementById("test").innerText += e.data;
  if (e.data === 9999) {
    document.getElementById("result").innerText = "循环结束";
    console.timeEnd("work");
  }
};
```
```
work.js
// 获取到主线程数据
onmessage = async (e) => {
  const {type, data} = e.data
  if(type === 'one') {
    data.forEach(item => {
      // 发送数据回主线程
      postMessage(item.name);
    })
  }else {
    let str = ''
    data.forEach(item => {
      str += item.name
    })
    // 发送数据回主线程
    postMessage(str)
  }
}
```
#二、web worker 与 正常js 使用区别
worker无法提供比主线程js更快的计算速度，并且因为通信和创建线程的问题，处理主线程无压力的js计算反而更慢。
worker能够在不影响主线程流畅度的情况下进行复杂计算。
#三、最大处理数据量问题
无法判断，和电脑配置、计算复杂程度、循环中是否操作页面dom有关，需要根据具体情况判断。
简单的js处理，40W数据，主线程也能在几十毫秒内结束，使用worker线程反而需要400毫秒左右。
页面卡顿，主要是dom渲染的问题，与纯js的计算关系不大。