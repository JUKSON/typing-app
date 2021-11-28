import React from 'react';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import useCountDown from 'react-countdown-hook';
import './App.css';
import texts from './texts';

const counterSeconds = 60;

export default function App() {
  const [text, setText] = useState('');
  const [typoIndex, setTypoIndex] = useState([]);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [timeLeft, { start, reset }] = useCountDown(counterSeconds * 1000, 100);
  const [modal, setModal] = useState(false);
  const [wpm, setWpm] = useState(0);

  const nextText = () => {
    setArrayIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > texts.length - 1) {
        return 0;
      }
      if (index < 0) {
        return (index = texts.length - 1);
      }
      return index;
    });
    setTypoIndex([]);
    setText('');
    reset();
  };

  const resetText = () => {
    setText('');
    setTypoIndex([]);
    reset();
  };

  const startTimer = () => {
    setText('');
    start();
  };

  const closeModal = () => {
    setModal(false);
    setText('');
    setTypoIndex([]);
  };

  const compareStrings = (firstValue, secondValue) => {
    let typos = [];
    secondValue.split('').forEach((character, index) => {
      if (character !== firstValue[arrayIndex].charAt(index)) {
        typos.push(index);
      }
    });
    return typos;
  };

  useEffect(() => {
    setTypoIndex(compareStrings(texts, text));
  }, [text]);

  useEffect(() => {
    if (text.length === 0) {
      return;
    }
    if (timeLeft !== 0) {
      return;
    }

    const words = (text.length - typoIndex.length) / 5;
    const wpm = words / 1;
    setWpm(wpm);
    setModal(true);
  }, [timeLeft]);

  return (
    <div className="app">
      {modal && <Modal wpm={wpm} closeModal={closeModal} />}
      <div className="sidebar">
        <div className="timer">{(timeLeft / 1000).toFixed(2)}</div>
        <button className="start" onClick={() => startTimer()}>
          Start
        </button>
      </div>
      <div className="content">
        <p>
          {texts[arrayIndex].split('').map((character, index) => {
            let spanClass = '';

            const checkTyping = text.length > index;
            if (checkTyping) {
              let typo = typoIndex.includes(index);
              if (typo) {
                spanClass = 'incorrect';
              }
              if (!typo) {
                spanClass = 'correct';
              }
            }

            return (
              <span key={index} className={spanClass}>
                {character}
              </span>
            );
          })}
        </p>

        <form>
          <textarea
            disabled={modal}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            placeholder="Test your typing skills..."
          />
        </form>
        <div className="buttons">
          <button className="next-btn" onClick={nextText}>
            Next
          </button>
          <button className="reset-btn" onClick={resetText}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
