// Dice roller
export const rollDice = (die, times = 1, modifier = 0) => {
  let sumOfRolls = 0
  for (let i = 1; i <= times; i++) {
    let currentRoll = Math.ceil(Math.random() * Math.floor(die))
    sumOfRolls += currentRoll
    // console.log('Rolled a d' + die + ' #' + i + ' for ' + currentRoll)
  }
  return sumOfRolls + modifier
}

// Dice expression (e.g. '2d6+2') roller. Expression is a String.
export const rollString = (expression) => {
  let times = parseInt(expression.split(/[d+]/)[0])
  let die = parseInt(expression.split(/[d+]/)[1]) ? parseInt(expression.split(/[d+]/)[1]) : 1
  let modifier = parseInt(expression.split(/[d+]/)[2]) ? parseInt(expression.split(/[d+]/)[2]) : 0
  return rollDice(die, times, modifier)
}

// Local storage
export const readLocalStorage = (localName) => {
  return JSON.parse(localStorage.getItem(localName))
}

export const updateLocalStorage = (data, localName) => {
  localStorage.setItem(localName, JSON.stringify(data))
}

export const clearLocalStorage = (localName) => {
  localStorage.removeItem(localName)
}
