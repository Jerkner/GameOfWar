const newDeckBtn = document.getElementById("newDeckBtn")
const drawBtn = document.getElementById("drawBtn")
const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
let score1 = document.getElementById("score1")
let score2 = document.getElementById("score2")
const remainingCards = document.getElementById("remainingCards")
const winner1 = document.getElementById("winner1")
const winner2 = document.getElementById("winner2")
const loser1 = document.getElementById("loser1")
const loser2 = document.getElementById("loser2")
let scoreCount1 = 0
let scoreCount2 = 0
let deckId = ''

async function newDeck() {
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()

        reset()

        deckId = data.deck_id
        remainingCards.innerText = data.remaining
    }

async function drawCards() {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()

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
            drawBtn.style.cursor = "not-allowed"

            if (scoreCount1 > scoreCount2) {
                winner1.hidden = false
                loser2.hidden = false
            } else if (scoreCount2 > scoreCount1) {
                winner2.hidden = false
                loser1.hidden = false
            } else {
                winner1.hidden = false
                winner2.hidden = false
            }
        }
      }
  
  function convertFaceCards(card) {
    switch (card) {
        case '10':
        return 10.5;
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

  function reset() {
    card1.innerHTML = `<img src="images/card-backside3-1.bmp">`
    card2.innerHTML = `<img src="images/card-backside3-1.bmp">`

    drawBtn.disabled = false
    drawBtn.style.cursor = "pointer"

    scoreCount1 = 0
    scoreCount2 = 0

    score1.innerText = `Score: ${scoreCount1}`
    score2.innerText = `Score: ${scoreCount2}`

    score1.style.color = "black"
    score2.style.color = "black"

    winner1.hidden = true
    winner2.hidden = true
    loser1.hidden = true
    loser2.hidden = true

  }

newDeckBtn.addEventListener("click", newDeck)
drawBtn.addEventListener("click", drawCards)

newDeck()