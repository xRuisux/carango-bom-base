export function delayFunc(func, milliseconds = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      func()
      resolve()
    }, milliseconds)
  })
}