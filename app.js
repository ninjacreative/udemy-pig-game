var scores, roundScore, activePlayer, gamePlaying, previousDice, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
       var die = [0,0];
        
        // 1. Random number
        die[0] = Math.floor( Math.random() * 6) + 1;
        die[1] = Math.floor( Math.random() * 6) + 1;
        var diceTotal = die[0] + die[1];
        
        // 2. Display results
        var diceDOM1 = document.querySelector('#dice-1');
        var diceDOM2 = document.querySelector('#dice-2');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = 'dice-' + die[0] + '.png';
        diceDOM2.src = 'dice-' + die[1] + '.png';

        //3. change turn if 1
        if (die[0] === 1 || die[1] === 1)  {
        scores[activePlayer] = 0;
            //next player
           nextPlayer();

        } 
        //if dice 6 AND previous dice 6 
        /* else if (dice === 6 && previousDice === 6) {
           
            nextPlayer();
        }
        */
        else {
            //add score to current
            roundScore += diceTotal;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        
       // previousDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gamePlaying) { 
    
    //add current score to global score
    scores[activePlayer] += roundScore; 
    
    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        //Check if player wins game
        if (scores[activePlayer] >= winScore) {
           
            // stop game and show who wins!
            document.querySelector('#name-' + activePlayer ).textContent = 'Player ' + (activePlayer + 1) + ' wins!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {

        //change player
            nextPlayer();
        }
    
    }
     
});

function nextPlayer() {
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

}

document.querySelector('.btn-new').addEventListener('click', init );

function init() {
    
    scores=[0,0];
    activePlayer = 0;
    roundScore = 0;
    
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
    setWinScore();
       
}

function setWinScore() {
    
    if (document.getElementById('winning-score').value) {
        winScore = document.getElementById('winning-score').value;
    }
    else {
        winScore = 100;
    }
    document.querySelector('.winning-score-output').textContent = winScore;
}





