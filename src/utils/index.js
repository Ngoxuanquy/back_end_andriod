const lodash = require('lodash')

const getInfoData = (fileds, object) => {
    return lodash.pick(object, fileds)
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 0]))
}

module.exports = { getInfoData, getSelectData, unGetSelectData }