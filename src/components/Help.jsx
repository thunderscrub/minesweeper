function Help({onClose}) {
      
      return(
        <div style={{"position": "fixed",
          "top": "0",
          "left": "0",
          "width": "100%",
          "height": "100%",
          "display": "flex",
          "justifyContent": "center",
          "alignItems": "center",
          "zIndex": "1001"}}>
          <div style={{"background": "white",
            "padding": "20px",
            "borderRadius": "10px",
            "textAlign": "center",
            "boxShadow": "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "width": "400px"}}>
                <button 
                    onClick={onClose} 
                    style={{
                        position: "relative",
                        top: "0px",
                        right: "-180px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer"
                    }}
                >
          ✖
        </button>
              <div>
                <h2>Help</h2>
                <ul style={{ textAlign: "left" }}>
                    <li>Use arrow keys to move cursor in minefield.</li>
                    <li>Use Enter key to open a tile.</li>
                    <li>Use space key to flag a tile.</li>
                    <li>Use H key to open/close this help menu.</li>
                    <li>Use R key to restart and open the settings menu.</li>
                    <li>Use M key to toggle sound on or off.</li>
                    <li>Use left click to open tiles and right click to flag tiles.</li>
                    <li>Time starts ticking after the first tile is opened.</li>
                </ul>
              </div>
          </div>
        </div>
    )
}

export default Help