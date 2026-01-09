let wins = parseInt(localStorage.getItem('wins')) || 0;
let losses = parseInt(localStorage.getItem('losses')) || 0;
let ties = parseInt(localStorage.getItem('ties')) || 0;

function updateScore() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
    document.getElementById('ties').textContent = ties;
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    localStorage.setItem('ties', ties);
}

updateScore();

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

function playGame(playerChoice) {
    console.log('Player choice received:', playerChoice);  
    const computerChoice = getComputerChoice();
    console.log('Computer choice:', computerChoice);  
    const result = determineWinner(playerChoice, computerChoice);

    const playerHandImg = document.getElementById('player-hand');
    const computerHandImg = document.getElementById('computer-hand');
    
    const imageMap = {
        rock: 'rock.jpg',
        paper: 'paper.jpg',
        scissors: 'scissor.jpg'  
    };
    
    playerHandImg.src = imageMap[playerChoice];
    playerHandImg.style.display = 'block';
    console.log('Player image set to:', playerHandImg.src);  
   
    computerHandImg.src = imageMap[computerChoice];
    computerHandImg.style.display = 'block';
    console.log('Computer image set to:', computerHandImg.src); 
   
    playerHandImg.onerror = () => {
        console.error('Player image failed to load for:', playerChoice);
        alert('Player image not found! Check filename: ' + imageMap[playerChoice]);
    };
    computerHandImg.onerror = () => {
        console.error('Computer image failed to load for:', computerChoice);
        alert('Computer image not found! Check filename: ' + imageMap[computerChoice]);
    };

    if (result === 'win') {
        document.getElementById('outcome-display').textContent = 'You win!';
        wins++;
    } else if (result === 'lose') {
        document.getElementById('outcome-display').textContent = 'You lose!';
        losses++;
    } else {
        document.getElementById('outcome-display').textContent = 'It\'s a tie!';
        ties++;
    }

    updateScore();
}

document.getElementById('reset-btn').addEventListener('click', () => {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScore();
    document.getElementById('player-hand').style.display = 'none';
    document.getElementById('computer-hand').style.display = 'none';
    document.getElementById('outcome-display').textContent = '-';
});
