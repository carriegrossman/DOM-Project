//cards in "card deck object"
const cardDeck = [
    {
        name: 'bob',
        img: 'images/bob.png',
    },
    {
        name: 'beedoo',
        img: 'images/beedoo.png',
    },
    {
        name: 'carl-vamp',
        img: 'images/carl_vamp.png',
    },
    {
        name: 'chef',
        img: 'images/chef.png',
    },
    {
        name: 'group',
        img: 'images/group.png',
    },
    {
        name: 'dave',
        img: 'images/dave.png',
    },
    {
        name: 'agent',
        img: 'images/agent.png',
    },
    {
        name: 'selfie',
        img: 'images/selfie.png',
    }
]

//duplicates array to create a match.. then also randomizes cards on game board
let gameBoard = cardDeck.concat(cardDeck)
gameBoard.sort(() => 0.5 - Math.random())

//added two guesses
let firstGuess = ''
let secondGuess = ''
//starting count at 0
let count = 0
//this should not allow you to click 2 cards to match
let previousTarget = null
//this will allow a delay after a selection so the user can see what 
//their selection was before the card is hidden agai
let delay = 1500

//this creates the game board to element game and create new section with board
const game = document.getElementById('game')
const board = document.createElement('section')
    board.classList.add('board')
    game.append(board)


//this gets the images to display on the game board and loops through each item and appends div to board.
gameBoard.forEach(item => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name

    const front = document.createElement('div')
    front.classList.add('front')

    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`
    
    board.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
  })



//match function.. 
const match = () => {
    let selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
      card.classList.add('match')
    })
  }

//this function resets the guesses. And will set all counts 
//and guesses back to their original values, as well as removing the selected CSS.
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
  
    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.remove('selected');
    });
  };

//added event listener to board.. event target is the click item
board.addEventListener('click', function(event) {
    let clicked = event.target
    //only let it select ind. divs not whole board
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
        return
      }
    //this only lets you you select 2 cards at a time
    if (count < 2) {
        count++;
        if (count === 1) {
          // Assign first guess
          firstGuess = clicked.parentNode.dataset.name;
          console.log(firstGuess);
          clicked.parentNode.classList.add('selected');
        } else {
          // Assign second guess
          secondGuess = clicked.parentNode.dataset.name;
          console.log(secondGuess);
          clicked.parentNode.classList.add('selected');
        }
        // If both guesses are not empty...
        if (firstGuess !== '' && secondGuess !== '') {
          // and the first guess matches the second match...
          if (firstGuess === secondGuess) {
            // run the match function
            setTimeout(match, delay)
            setTimeout(resetGuesses, delay)
          } else {
            setTimeout(resetGuesses, delay)
          }
        }
        previousTarget = clicked;
      }
    })
