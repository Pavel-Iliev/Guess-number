import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  let cards = [];
  const [deck, setDeck] = useState(cards);
  const [listThereIs, setListThereIs] = useState([]);
  const [choosenNumber, setChoosenNumber] = useState(0);

  function getCards() {
    for (let i = 1; i <= 7; i++) {
      cards.push({
        id: i,
        value: Math.pow(2, i - 1),
        image: `/img/card-${i}.png`,
        added: false
      })
    }

    var currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  }

  getCards();

  useEffect(() => {
    checkIfNumberUnder100();
    showButton();

  });

  function checkIfNumberUnder100() {
    const alertWrap = document.querySelector('.wrap-alert-check__alert');
    if (choosenNumber > 100) {
      alertWrap.classList.add('over-100');
    } else {
      alertWrap.classList.remove('over-100');
    }
  }

  function showButton() {
    const buttonWrap = document.querySelector('.wrap-alert-check__check');
    if (choosenNumber >= 1 && choosenNumber <= 100) {
      buttonWrap.classList.add('show');
    } else {
      buttonWrap.classList.remove('show');
    }
  }

  function showTheNumber() {
    document.querySelector('.your-number').classList.add('show-number')
  }

  function restartGame() {
    setListThereIs([]);
    document.querySelectorAll('.selected-card').forEach(e => e.classList.remove('selected-card'));
    setChoosenNumber(0);
    document.querySelector('.your-number').classList.remove('show-number');
    document.querySelector('.wrap-alert-check__check').classList.remove('show');
    deck.forEach(e => e.added = false);
  }


  return (
    <>
      <div className="guess-number">
        <h1>Guess number</h1>
        <p>Think of a number from 1 to 100 and select <strong>all cards</strong> where the number is present!<br/>

        <strong>You must be sure that you have selected all the cards.</strong></p>
        <ul className="deckCards">
          {deck.map((element) =>
            <li className="card" key={element.id} onClick={(e) => {
              let addedCard;
              if (!element.added) {
                setChoosenNumber(choosenNumber + element.value);
                addedCard = listThereIs.concat(element);
                e.target.parentElement.className = ' selected-card';
                checkIfNumberUnder100();
                showButton();
              } else {
                setChoosenNumber(choosenNumber - element.value);
                const index = listThereIs.indexOf(element);
                addedCard = [...listThereIs];
                addedCard.splice(index, 1);
                e.target.parentElement.className = '';
              }
              element.added = !element.added;
              setListThereIs(addedCard);
            }}>
              <img src={element.image} alt="" />
            </li>
          )}
        </ul>
        <div className="wrap-alert-check">
          <div className="wrap-alert-check__alert">
            <p>You have to think a number between 1-100!The actual number is over 100, check your number and remove the wrong card!</p>
          </div>
          <div className="wrap-alert-check__check">
            <button onClick={showTheNumber}>Guess the number!</button>
          </div>
        </div>

        <div className="your-number">
          <p>Your number is <span className="your-number__number">{choosenNumber}</span></p>
          <button onClick={restartGame}>Restart the game</button>
        </div>

        <ul className="cards-there-is">
          {
            listThereIs.length === 0 ? <li className="cards-there-is--text">Haven't thought of a number yet?</li> : <li className="cards-there-is--text">Your Cards</li>
          }
          {
            listThereIs.map(element =>
              <li className="card" key={element.id}>
                <img src={element.image} alt="" />
              </li>
            )}
        </ul>
      </div>

    </>
  );
}

export default App;

