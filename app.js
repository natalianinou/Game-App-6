//Global Variables
const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
const btnReset = document.getElementsByClassName('btn__reset')[0];
let missed = 0;

const phrases = [
  'Never judge a book by its cover',
  'Knowledge is no burden',
  'A stitch in time saves nine',
  'Learn something new every day',
  'Birds of a feather flock together',
  'Better late than never',
  'Barking dogs never bite'
];

const overlay = document.getElementById('overlay');



//Hide overlay on start screen
btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
});

//create a getRandomPhrasesAsArray function
function getRandomPhrase(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  const randomPhrase = phrases[randomNumber]
  return randomPhrase;
}

getRandomPhrase(phrases);

//Set the game display
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let li = document.createElement('li');
    li.textContent = arr[i].toLowerCase();
    phrase.appendChild(li);
    if (li.textContent === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
  }
}
const phraseArray = getRandomPhrase(phrases);
addPhraseToDisplay(phraseArray);

//Create a checkletter function
function checkLetter(btn) {
  const keyBoardLetters = document.querySelectorAll('li');

  let match = null;
  for (let i = 0; i < keyBoardLetters.length; i++) {
    if (keyBoardLetters[i].textContent === btn.textContent) {
      keyBoardLetters[i].classList.add('show');
      match = btn;
    }
  }
  return match;
}

//add an addEventListener to the keyboard

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.disabled = true;
    const correctLetter = checkLetter(e.target);
    if (correctLetter === null) {
      const hearts = document.querySelectorAll('#scoreboard img');
      hearts[missed].src = 'images/lostHeart.png';
      missed++;
    }
    checkWin();
  }
// add checkWin funcion
  function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const title = document.querySelector('.title');
    if (letter.length === show.length) {
      title.innerHTML = 'You are a winner!';
      overlay.classList.add('win');
      overlay.style.display = 'flex';
      btnReset.innerHTML = 'Play Again';
      btnReset.addEventListener('click', e => window.location.reload());
    } else {
      if (missed >= 5) {
        title.innerHTML = 'Sorry you lost.';
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
        btnReset.innerHTML = 'Play Again';
        btnReset.addEventListener('click', e => window.location.reload());

      }
    }
  };
});
