'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl=document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//Starting conditions
let scores, currentScore, activePlayer,playing;
// diceEl.classList.add('hidden');
const init =function(){//initialization
    scores = [0,0];//final big scores of both players is stored in array
    currentScore = 0;
    activePlayer = 0;
    playing =true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent=0;
    current1El.textContent=0;
    
    diceEl.classList.add('hidden');
    // diceEl.classList.remove('hidden');
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    //at this point we don't know which is active player so we have to remove active class as well from both the players. and we will make player 1 the active player

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();//when app is opened or reloaded
//rolling dice

//state variables


const switchPlayer = function(){
    //switch to next player
    document.getElementById(`current--${activePlayer}`).textContent=0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    //toggling both of them at the same time will insure that it's only ever on one of the elements at once
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice funtionality
btnRoll.addEventListener('click',function(){
    if(playing){
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() *6)+1;
    //dice is a number here 1,2,3,4,5,6

    //2. Display dice
    diceEl.classList.remove('hidden');
    //This will dynamically generate ONE of the random IMAGE here depending upon the random rolled dice
    diceEl.src=`dice-${dice}.png`;

    //3. Check for rolled 1
    if(dice !== 1){
        //Add dice to current score
        currentScore += dice;
        // console.log(dice);
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        // current0El.textContent=currentScore;//WILL CHANGE LATER
    }else{
        //when dice=1
        //switch to next player
        switchPlayer();
    }
}
});

btnHold.addEventListener('click',function(){
    if(playing){
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    //scores[1] = scores[1] +currentScore;
    //display scores
    document.getElementById(`score--${activePlayer}`).textContent =scores[activePlayer];

    //2.check if player's score >= 100 
    if(scores[activePlayer] >= 100) {
        //finish the game
        playing=false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    }else{
        //3.Switch to next player
        switchPlayer();
    }
}
});

btnNew.addEventListener('click',init);

