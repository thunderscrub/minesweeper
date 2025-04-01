function Board({board, onCellClick, onContextMenu, status, useHighlight}) {

    const style = {
        hidden: {
            "display": "inline-block",
            "background": "gray",
            "width": "45px",
            "height": "45px",
            "borderStyle": "outset",
            "fontSize": "30px",
            "justifyContent": "center",
            "alignItems": "center",
            "cursor":"pointer",
            "userSelect": "none"
        },
        revealed: {
            "display": "inline-flex",
            "background": "lightgray",
            "width": "45px",
            "height": "45px",
            "borderStyle": "inset",
            "fontSize": "20px",
            "justifyContent": "center",
            "alignItems": "center",
            "cursor":"default",
            "userSelect": "none"
        },
        highlighted: {
            "borderStyle": "solid",
            "borderColor": "green"
        }
    }

    return(
        <div style={{
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "height": "85vh",
            "fontSize": "0"
        }}>
            <div style={{ "display": "inline-block", "textAlign": "center" }}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} style={{"display": "flex","fontSize":0}}>
                {row.map((cell, colIndex) => {
                    return(<div 
                        key={`${rowIndex}-${colIndex}`} 
                        style={cell.revealed&&!cell.highlighted?style.revealed:cell.revealed&&cell.highlighted&&useHighlight?{...style.revealed, ...style.highlighted}:!cell.revealed&&cell.highlighted&&useHighlight?{...style.hidden, ...style.highlighted}:style.hidden} 
                        onClick={() => onCellClick(rowIndex, colIndex)}
                        onContextMenu={(e) => onContextMenu(e, rowIndex, colIndex)}>
                        {cell.revealed&&cell.adjacent!=0?cell.adjacent:cell.flagged&&!cell.revealed?"🚩":cell.exploded?"💥":cell.hasBomb&&!cell.exploded&&status=="lose"?"💣":""}</div>)
}               )}
                </div>
            ))}
        </div>
        </div>
    )
}
export default Board