import Board from "./Board";
import KeyboardListenerController from "./KeyboardListenerController"

import victory from "../sound/victory.mp3"
import dirt from "../sound/dirt.mp3"
import explosion from "../sound/explosion.mp3"
import flag from "../sound/flag.mp3"

import { useEffect, useState} from "react";
const GameController = ({gridSize, useChance, bombPercentage, bombCount, gameStatus, statusCallback, isRunning, timerStartPause, openSettings, toggleHelp}) => {
    const [board, setBoard] = useState(initializeBoard(gridSize, bombPercentage));
    const [currentCoords, setCurrentCoords] = useState([0,0])
    const [useHighlight, setUseHighlight] = useState(false)
    const [audio] = useState({
        victory:new Audio(victory),
        dirt:new Audio(dirt),
        explosion:new Audio(explosion),
        flag:new Audio(flag),
    })
    useEffect(()=>{
        setBoard(initializeBoard(gridSize, bombPercentage))
    },[gridSize, bombPercentage, useChance, bombCount])

    function initializeBoard(size, chance) {
        const initialBoard = []
        for (let row = 0; row<size; row++){
            initialBoard.push([])
            for (let col = 0; col<size; col++){
                if(useChance){
                    initialBoard[row].push(Math.random()<(chance/100) ? {
                        hasBomb: true,
                        revealed: false,
                        adjacent: null,
                        flagged:false,
                        exploded:false,
                        highlighted:false
                        } : {
                        hasBomb: false,
                        revealed: false,
                        adjacent: null,
                        flagged:false,
                        exploded:false,
                        highlighted:false
                        })
                }else{
                    initialBoard[row].push({
                        hasBomb: false,
                        revealed: false,
                        adjacent: null,
                        flagged:false,
                        exploded:false,
                        highlighted:false
                        })
                    }
                }
            }
            if(!useChance){
                let fTries = 0
                let bombs = bombCount
                for(;bombs>0-fTries;bombs--){
                    let rrow = Math.floor(Math.random()*size)
                let rcol = Math.floor(Math.random()*size)
                if(initialBoard[rrow][rcol].hasBomb){
                    fTries++
                    continue
                }
                initialBoard[rrow][rcol].hasBomb = true
            }
        }
        for (let row = 0; row<size; row++){
            for (let col = 0; col<size; col++){
                if(initialBoard[row][col].hasBomb) continue
                let adjacent = 0
                if(row-1>-1&&col-1>-1&&initialBoard[row-1][col-1].hasBomb)adjacent++
                if(row-1>-1&&initialBoard[row-1][col].hasBomb)adjacent++
                if(row-1>-1&&col+1<size&&initialBoard[row-1][col+1].hasBomb)adjacent++
                if(col-1>-1&&initialBoard[row][col-1].hasBomb)adjacent++
                if(col+1<size&&initialBoard[row][col+1].hasBomb)adjacent++
                if(row+1<size&&col-1>-1&&initialBoard[row+1][col-1].hasBomb)adjacent++
                if(row+1<size&&initialBoard[row+1][col].hasBomb)adjacent++
                if(row+1<size&&col+1<size&&initialBoard[row+1][col+1].hasBomb)adjacent++
                initialBoard[row][col].adjacent = adjacent
            }
        }
        return initialBoard
    }

    const reveal = (row, col) => {
        let newBoard = [...board]
        if(!newBoard[row][col].hasBomb&&!newBoard[row][col].revealed&&newBoard[row][col].adjacent==0){
            newBoard[row][col].revealed=true
            //Horizontal and vertical
            if(row+1<gridSize&&newBoard[row+1][col].adjacent==0){
                reveal(row+1, col)
            }else if(row+1<gridSize&&newBoard[row+1][col].adjacent!=0){
                newBoard[row+1][col].revealed=true
            }
            if(row-1>-1&&newBoard[row-1][col].adjacent==0){
                reveal(row-1, col)
            }else if(row-1>-1&&newBoard[row-1][col].adjacent!=0){
                newBoard[row-1][col].revealed=true
            }
            if(col+1<gridSize&&newBoard[row][col+1].adjacent==0){
                reveal(row, col+1)
            }else if(col+1<gridSize&&newBoard[row][col+1].adjacent!=0){
                newBoard[row][col+1].revealed=true
            }
            if(col-1>-1&&newBoard[row][col-1].adjacent==0){
                reveal(row, col-1)
            }else if(col-1>-1&&newBoard[row][col-1].adjacent!=0){
                newBoard[row][col-1].revealed=true
            }//Diagonals
            if(row-1>-1&&col-1>-1){
                reveal(row-1, col-1)
            }
            if(row-1>-1&&col+1<gridSize){
                reveal(row-1, col+1)
            }
            if(row+1<gridSize&&col-1>-1){
                reveal(row+1, col-1)
            }
            if(row+1<gridSize&&col+1<gridSize){
                reveal(row+1, col+1)
            }
        }else if(newBoard[row][col].adjacent!=0){
            newBoard[row][col].revealed=true
        }
        setBoard(newBoard)
        if(checkVictoryCondition(board,gridSize)){
            timerStartPause()
            console.log("VICTORY")
            statusCallback("win")
            audio.victory.play()
        }
    }

    const checkVictoryCondition = (board, size) => {
        for(let row = 0; row<size; row++){
            for(let col = 0; col<size; col++){
                if(!board[row][col].hasBomb&&!board[row][col].revealed) return false
            }
        }
        return true
    }

    const handleCellOpen = (row, col) => {
        if(!isRunning) {
            timerStartPause()
        }
        if(board[row][col].hasBomb){
            timerStartPause()
            console.log("YOU LOST")
            let newBoard = [...board]
            newBoard[row][col].exploded = true
            setBoard(newBoard)
            statusCallback("lose")
            audio.explosion.play()
        }else if(!board[row][col].revealed){
            reveal(row,col)
            audio.dirt.play()
        }
    }

    const handleCellFlag = (row, col) => {
        const newBoard = [...board]
        newBoard[row][col].flagged = !(newBoard[row][col].flagged)
        setBoard(newBoard)
        audio.flag.play()
    }

    const handleCellClick = (row, col) => {
        if(gameStatus=="lose"||gameStatus=="win")return
        setUseHighlight(false)
        handleCellOpen(row,col)
    }

    const handleCellRightClick = (e, row, col) => {
        e.preventDefault()
        handleCellFlag(row, col)
    }

    const handleKeyPress = (key) => {
        switch(key) {
            case 'r':
              openSettings()
              break
            case 'ArrowUp':
                setUseHighlight(true)
                if(currentCoords[0]>0){
                    let newBoard = [...board]
                    newBoard[currentCoords[0]][currentCoords[1]].highlighted=false
                    let newCoords = [...currentCoords]
                    newCoords[0] = newCoords[0] - 1
                    setCurrentCoords(newCoords)
                    newBoard[newCoords[0]][currentCoords[1]].highlighted=true
                    setBoard(newBoard)
                }
                break
            case 'ArrowLeft':
                setUseHighlight(true)
                if(currentCoords[1]>0){
                    let newBoard = [...board]
                    newBoard[currentCoords[0]][currentCoords[1]].highlighted=false
                    let newCoords = [...currentCoords]
                    newCoords[1] = newCoords[1] - 1
                    setCurrentCoords(newCoords)
                    newBoard[currentCoords[0]][newCoords[1]].highlighted=true
                    setBoard(newBoard)
                }
                break
            case 'ArrowDown':
                setUseHighlight(true)
                if(currentCoords[0]<gridSize-1){
                    let newBoard = [...board]
                    newBoard[currentCoords[0]][currentCoords[1]].highlighted=false
                    let newCoords = [...currentCoords]
                    newCoords[0] = newCoords[0] + 1
                    setCurrentCoords(newCoords)
                    newBoard[newCoords[0]][currentCoords[1]].highlighted=true
                    setBoard(newBoard)
                }
                break
            case 'ArrowRight':
                setUseHighlight(true)
                if(currentCoords[1]<gridSize-1){
                    let newBoard = [...board]
                    newBoard[currentCoords[0]][currentCoords[1]].highlighted=false
                    let newCoords = [...currentCoords]
                    newCoords[1] = newCoords[1] + 1
                    setCurrentCoords(newCoords)
                    newBoard[currentCoords[0]][newCoords[1]].highlighted=true
                    setBoard(newBoard)
                }
                break
            case ' ':
                if(useHighlight){
                    handleCellFlag(...currentCoords)
                }
              break
            case 'Enter':
                if(useHighlight){
                    handleCellOpen(...currentCoords)
                }
                break
            case 'h':
                toggleHelp()
                break
            default:
              return
        }
    }

    return(
        <>
            <Board board={board} onCellClick={handleCellClick} onContextMenu={handleCellRightClick} status={gameStatus} useHighlight={useHighlight}/>
            <KeyboardListenerController handleKeyPress={(key)=>handleKeyPress(key)}/>
        </>
    )
}
//🚩💣🏆💥
export default GameController