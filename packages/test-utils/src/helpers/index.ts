export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function request(req) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (req === 0)
        reject(new Error('fail'))
      else
        resolve('success')
    }, 1000),
  )
}
