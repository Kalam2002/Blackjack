let suits = [" ♠ ", " ♥ ", " ♦ ", " ♣ "]
let ranks = [
  { name: "A", value: 11 }, 
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 10 },
  { name: "Q", value: 10 },
  { name: "K", value: 10 }
]

let deck = []
let cards = [] 
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")

let player = {
  name: "Player",
  chips: 250
}
let playerEl = document.getElementById("player-el")
playerEl.textContent = "Chips: $" + player.chips 

function buildDeck() {
  deck = []
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ card: rank.name + suit, value: rank.value })
    }
  }
}

function getRandomCard() {
  let index = Math.floor(Math.random() * deck.length)
  let card = deck[index]
  deck.splice(index, 1)
  return card
}

function start() {
  buildDeck()
  if(isAlive && sum==0) {
    alert("You are already in the game!")
    return
  }
  if(player.chips < 10) {
    alert("You don't have enough chips to play!")
    isAlive=false
    return
  }         
  isAlive = true
  hasBlackJack = false
  player.chips -=10
  playerEl.textContent = "Chips: $" + player.chips 
  cards = [getRandomCard(), getRandomCard()]
  sum = cards[0].value + cards[1].value
  renderGame()
}

function renderGame() {
  cardEl.textContent = "Cards: " + cards.map(c => c.card).join(" , ")
  sumEl.textContent = "Sum: " + sum
  if (sum <= 20) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message = "Wohoo! You've got Blackjack!"
    hasBlackJack = true
    player.chips += 75
    playerEl.textContent = "Chips: $" + player.chips 
  } else {
    message = "You're out of the game!"
    isAlive = false
  }
  messageEl.textContent = message
}
function newcard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard()
    cards.push(card)
    sum += card.value

    if (sum > 21) {
      for (let c of cards) {
        if (c.name === "A" && c.value === 11) {
          c.value = 1
          sum -= 10
          break
        }
      }
    }
    renderGame()
  }
}
