const User = require('../models/user')

const palindrome = string => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  palindrome,
  average,
  usersInDb
}