import React, { useEffect, useRef, useState } from 'react';
import './App.css';
//import hole from "./assets/hole.png"
import { Mole } from './components/Mole';

const App: React.FC = () => {
  const [score, setScore] = useState (0);
  const [moleVisible, setMoleVisible] = useState(false);
  const [molePosition, setMolePosition] = useState({row: 0, col:0});
  const [startGame, setStartGame] = useState(false);
  const [moleDuration, setMoleDuration] = useState(1000); //in milliseconds
  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [missedClicks, setMissedClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [successRate, setSuccessRate] = useState(100);
  const durationUntilNextMole = 1500;
 // const gridCellRefs = Array.from({ length: 16 }, () => useRef(null));


  const handleMoleClick = (row: number, col: number) => {
    const gridCells = document.querySelectorAll('.grid-cell');

    if(moleVisible && row === molePosition.row && col === molePosition.col) {
      setScore(score + 1 );
      setSuccessfulClicks((SuccessfulClicks) => SuccessfulClicks + 1);
      setMoleVisible(false);
      setMoleDuration((MoleDuration) => Math.max(50, MoleDuration - 50));
      setTotalClicks(totalClicks + 1);
      gridCells[row*3 + col].classList.add('successful'); // works for 4x4 grid
      setTimeout(() => {
        gridCells[row*3 + col].classList.remove('successful');
      }, 250);
    }else {
      setMissedClicks((MissedClicks) => MissedClicks + 1);
      setMoleDuration((MoleDuration) => Math.min(durationUntilNextMole, MoleDuration + 100));
      setTotalClicks(totalClicks + 1);
      gridCells[row * 3 + col].classList.add('missed');
      setTimeout(() => {
        gridCells[row *3 + col].classList.remove('missed'); 
      }, 250);
    }
  };
  const rate = totalClicks > 0 ? (successfulClicks/(totalClicks))*100 : 0;
  useEffect(()=>{
    setSuccessRate(rate);
  },[rate]);

  const handleResetScore = () => {
    setScore(0);
    setSuccessRate(100);
    setSuccessfulClicks(0);
    setMissedClicks(0);
    setMoleDuration(1000);
    setTotalClicks(0);
  };

  const handleStartStopGame = () => {
    if (startGame) {
      setStartGame(false);
      setMoleVisible(false);
    } else {
    setStartGame(true);
    }
  };

  useEffect(() => {
    let moleInterval: NodeJS.Timeout | null = null; 
    if(startGame){
    moleInterval = setInterval(()=> {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 4);
      setMolePosition({row,col});
      setMoleVisible(true);
      setTimeout(() => {
        setMoleVisible(false);
      },moleDuration);
    }, durationUntilNextMole);
  }
    return () => {
      if(moleInterval) clearInterval(moleInterval);
    };
  }, [startGame,moleDuration]);

  return (
    <div className="App">
      <div className='input-box'> 
      <input 
        className="game-input"
        type="number"
        value={moleDuration}
        onChange={(e) => setMoleDuration(parseInt(e.target.value,10))}
        placeholder="Enter duration in milliseconds"
      /></div>
      <button className="game-button" onClick = {handleStartStopGame}>{startGame ? 'Stop' : 'Start'}</button>
      <button className="game-button" onClick = {handleResetScore}>Reset</button>
      <div className="score">
        <div>Score: {score} </div>
        <div>Successful Clicks: {successfulClicks}</div>
        <div>Missed Clicks: {missedClicks}</div>  
        <div>Total Clicks: {totalClicks}</div>  
        <div>Success Rate: {successRate.toFixed(0)}%</div>      
      </div>
      <div className="grid">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <Mole
              key={`${row}-${col}`}
              visible={moleVisible && row === molePosition.row && col === molePosition.col}
              onClick = {() => handleMoleClick(row, col)}
             // gridCellRef={gridCellRefs[row * 4 + col]}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;