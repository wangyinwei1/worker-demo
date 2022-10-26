onmessage = async (e) => {
  const {type, data} = e.data
  console.log(e)
  if(type === 'one') {
    data.forEach(item => {
      postMessage(item.name);
    })
  }else {
    let str = ''
    data.forEach(item => {
      str += item.name
    })
    postMessage(str)
  }
}