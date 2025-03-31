import Settings from "./components/Settings"
import GameController from "./components/GameController"
import NavBar from "./components/NavBar"
import Timer from "./components/Timer"
import Banner from "./components/Banner"
import { useState, useEffect } from "react"

function App() {
  const [playerName, setPlayerName] = useState("")
  const [gridsize, setGridSize] = useState(0)
  const [useChance, setUseChance] = useState(false)
  const [bombPercentage, setBombPercentage] = useState(0)
  const [bombCount, setBombCount] = useState(0)
  const [showSettings, setShowSettings] = useState(true);
  const [gameStatus, setGameStatus] = useState(null);
  const [bannerVisible, setBannerVisible] = useState(false)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const resultCallback = (result) => {
    if(result.BombCount >= result.Gridsize*result.Gridsize) return
    setPlayerName(result.PlayerName||"Player")
    setGridSize(Number(result.Gridsize))
    setUseChance(result.useChance)
    setBombPercentage(Number(result.BombPercentage))
    setBombCount(Number(result.BombCount)||10)
    setShowSettings(false);
  }

  const statusCallback = (status) => {
    setGameStatus(status)
    setBannerVisible(true)
  }

  const openSettings = () => {
    setShowSettings(!showSettings)
    setGridSize(0)
    setUseChance(false)
    setBombPercentage(0)
    setBombCount(0)
    setGameStatus(null)
    handleReset()
  }
  
  return(
    <>
    <NavBar showSettings={openSettings}/>
    <Timer time={time}/>
    {showSettings && <Settings resultCallback={resultCallback} setShowSettings={setShowSettings} />}
    <GameController gridSize={gridsize} useChance={useChance} bombPercentage={bombPercentage} bombCount={bombCount} gameStatus={gameStatus} statusCallback={statusCallback} timerStartPause={handleStartPause} isRunning={isRunning}/>
    <Banner 
        message={gameStatus === "win" ? "🏆 You Win! 🏆" : gameStatus === "lose" ? "💀 Game Over 💀" : ""} 
        visible={bannerVisible} 
        onClose={() => setBannerVisible(false)} 
      />
    </>
  )
}

export default App
