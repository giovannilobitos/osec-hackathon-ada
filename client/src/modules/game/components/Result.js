import React, { useState }  from 'react';
import { results } from '/lib/assets/images';
import Credits from './Credits';

export default function Game(props) {
  const [isShowCredits, setIsShowCredits] = useState(false);
  function getRandomElement(array){
    return array[Math.floor(Math.random()*array.length)];
  }

  function showCredits() {
    setIsShowCredits(true);
  }

  const keys = ['a','b','c','d','e','f','g','h','i'];

  const animal = getRandomElement(keys);

  if (isShowCredits) {
    return (
      <Credits />
    );
  }

  return (
    <main className="wrap passcode-form resultTransition">
      <div className="animalHeader">
        <h1 className="title">You are a :</h1>
        <div className="animalName">
          <p>{results[animal].name}</p>
        </div>
        <div className="animalImg">
          <img src={results[animal].src} className="animalResultImg Checked" />
        </div>
        <div className="animalDescription">
          <p>{results[animal].description}</p>
        </div>
      </div>
      <div className="action">
        <button className="nextButton quitButton" onClick={showCredits}>Quit</button>
        {/* <a className="nextButton quitButton" href="javascript:window.open('','_self').close();">close</a> */}
      </div>
    </main>
  )
}
