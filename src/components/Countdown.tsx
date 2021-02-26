import { useState, useEffect, useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;


const tempo = 0.1 * 60;

export function Countdown() {
  const { startNewChallenge } = useContext(challengesContext);



  const [time, setTime] = useState(tempo);
  const [isactive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function reseetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(tempo);
  }

  useEffect(() => {
    if(isactive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isactive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isactive, time])


  return (
    <div>
        <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>
        
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
    
    {hasFinished ? (
      <button
        disabled
        className={`${styles.countdownButton}`}
       > 
      Ciclo encerrado
      </button>
    ) : (
      <>
        { isactive ? (
        <button 
          type="button" 
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={reseetCountdown}
        >
        Abandonar ciclo
        </button>
        ) : (
        <button 
          type="button" 
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
        )}
      </>
    ) }

    

    </div>
  )
}