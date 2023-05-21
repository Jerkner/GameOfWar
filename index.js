const newDeckBtn = document.getElementById("newDeckBtn")
const drawBtn = document.getElementById("drawBtn")
const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
let score1 = document.getElementById("score1")
let score2 = document.getElementById("score2")
const remainingCards = document.getElementById("remainingCards")
let scoreCount1 = 0
let scoreCount2 = 0
let deckId = ''

function newDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(response => response.json())
    .then(data => {

        deckId = data.deck_id

        card1.innerHTML = `<img src="images/card-backside2.jpeg">`
        card2.innerHTML = `<img src="images/card-backside2.jpeg">`

        scoreCount1 = 0
        scoreCount2 = 0

        score1.innerText = `Score: ${scoreCount1}`
        score2.innerText = `Score: ${scoreCount2}`

        score1.style.color = "black"
        score2.style.color = "black"

        remainingCards.innerText = data.remaining
        drawBtn.disabled = false
    })
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
      .then(response => response.json())
      .then(data => {

        const convertedValue1 = convertFaceCards(data.cards[0].value);
        const convertedValue2 = convertFaceCards(data.cards[1].value);
  
        card1.innerHTML = `<img src=${data.cards[0].image}>`
        card2.innerHTML = `<img src=${data.cards[1].image}>`

        if (convertedValue1 > convertedValue2) {
            scoreCount1 += 1
            score1.style.cssText = "color: red"
            score2.style.cssText = "color: black"
        } else if (convertedValue2 > convertedValue1) { 
            scoreCount2 += 1
            score2.style.cssText = "color: red"
            score1.style.cssText = "color: black"
        } else {
            scoreCount1 += 1
            scoreCount2 += 1
            score1.style.cssText = "color: red"
            score2.style.cssText = "color: red"
        }

        score1.innerText = `Score: ${scoreCount1}`
        score2.innerText = `Score: ${scoreCount2}`

        remainingCards.innerText = data.remaining;
        if (data.remaining === 0) {
            drawBtn.disabled = true
            drawBtn.style.cursor = "unset"
        }
      });
  }
  
  function convertFaceCards(card) {
    switch (card) {
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
        case 'ACE':
        return 14;
      default:
        return card;
    }
  }

newDeckBtn.addEventListener("click", newDeck)
drawBtn.addEventListener("click", drawCards)

newDeck()