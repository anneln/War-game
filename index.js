let deckId
let computerScore = 0
let myScore = 0

const numberOfCards = document.getElementById('number-of-cards')
const drawTwoCards = document.getElementById('draw-two-cards')
const newDeck = document.getElementById("new-deck")
const cardsEl = document.getElementById('cards')
const computerScoreEl = document.getElementById('computer-score')
const myScoreEl = document.getElementById('my-score')
const logMessage = document.getElementById('log-message')

async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    const remainingCards = data.remaining
    numberOfCards.innerHTML =
    `<p>Remaining: ${data.remaining}</p>`
    drawTwoCards.style.visibility= "visible"  
}

newDeck .addEventListener("click", handleClick)
 
async function drawTwoCard(){
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsEl.children[0].innerHTML = 
    `<img src='${data.cards[0].image}' class='card-image'/>`
    cardsEl.children[1].innerHTML = 
    `<img src='${data.cards[1].image}' class='card-image'/>`
    const message = cardScore(data.cards[0], data.cards[1])
    remainingCards = data.remaining
    numberOfCards.innerHTML =
    `<p>Remaining: ${data.remaining}</p>`
    if(data.remaining === 0){
        endOfGame()
        if(computerScore > myScore){
            logMessage.textContent = "Computer won the game..☠️!"
            } else if (myScore > computerScore){
                logMessage.textContent = "🎉 You won the game 🎉!"
                } else {
                    logMessage.textContent ="It's a tie game ! 😶"
                    }
        }
    }

drawTwoCards.addEventListener("click", drawTwoCard)


function cardScore(card1, card2){
   const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
   const cardIndex1 = cardValues.indexOf(card1.value)
   const cardIndex2 = cardValues.indexOf(card2.value)
   if(cardIndex1 > cardIndex2) {
       computerScoreEl.innerHTML = `
       Computer Score : ${computerScore+=1}`
            return logMessage.innerHTML = 
            `<p>Computer win !</p>`
    }
    else if (cardIndex2 > cardIndex1){
        myScoreEl.innerHTML = `
        Your Score : ${myScore+=1}`
        return logMessage.innerHTML = 
        `<p> You win !</p>`
    }
    else {
        return logMessage.innerHTML = 
        `<p>War !!</p>`}
}

function endOfGame(){
    drawTwoCards.disable = true
    drawTwoCards.style.visibility= "hidden"
    }
   





