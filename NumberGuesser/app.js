let min = 1,
    max = 10,
    winningNum = generateRandom(min, max),
    guessesLeft = 3;

function generateRandom(min, max) {
  return Math.ceil(Math.random() * (max - min + 1) + min);
}

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function() {
  let guess = guessInput.value;
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  else {
    if (guess == winningNum) {
      gameOver(`${guess} is correct, YOU WIN!`, true);
    }
    else {
      guessesLeft--;
      guessInput.style.borderColor = 'red';
      if (guessesLeft <= 0) {
        gameOver(`Game over you lost. The correct number is ${winningNum}`, false);

      }
      else {
        guessInput.value = '';
        setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red')
      }
    }
  }
});

function gameOver(msg, won) {
  const color = won ? 'green' : 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor =  color;
  setMessage(msg, color);
  guessBtn.value = 'Play again';
  guessBtn.className = 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}