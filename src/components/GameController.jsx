import Board from "./Board";

import { useEffect, useState} from "react";
const GameController = ({gridSize, useChance, bombPercentage, bombCount, gameStatus, statusCallback, isRunning, timerStartPause}) => {
    const [board, setBoard] = useState(initializeBoard(gridSize, bombPercentage));

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
                        exploded:false
                        } : {
                        hasBomb: false,
                        revealed: false,
                        adjacent: null,
                        flagged:false,
                        exploded:false
                        })
                }else{
                    initialBoard[row].push({
                        hasBomb: false,
                        revealed: false,
                        adjacent: null,
                        flagged:false,
                        exploded:false
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

    const handleCellClick = (row, col) => {
        if(gameStatus=="lose"||gameStatus=="win")return
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
        }else if(!board[row][col].revealed){
            reveal(row,col)
        }
    }

    const handleCellRightClick = (e, row, col) => {
        e.preventDefault()
        const newBoard = [...board]
        newBoard[row][col].flagged = !(newBoard[row][col].flagged)
        setBoard(newBoard)
    }

    return(
        <>
            <Board board={board} onCellClick={handleCellClick} onContextMenu={handleCellRightClick} status={gameStatus}/>
        </>
    )
}
//🚩💣🏆💥
export default GameController