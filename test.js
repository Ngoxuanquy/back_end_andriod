// const crypto = require('crypto')

// const randomCrypto = crypto.randomBytes(64).toString('hex')

// console.log(randomCrypto)

const obj = {
    name: 'a',
    B: 'b',
    C: 'c',
}

console.log(obj['name'])

const unGetSelectData = (select = []) => {
    return Object.fromEntries(
        select.map((el) => {
            return [el, 0]
        })
    )
}

console.log(unGetSelectData(['a', 'b', 'c']))
