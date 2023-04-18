const fun = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('okee')
        }, timeout)
    })
}

;(async function () {
    let a = await fun(2000)
    console.log(a)
})()
