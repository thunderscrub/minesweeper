

const NavBar = ({showSettings, showHelp}) => {

    return(
        <div style={{
            "zIndex": "1002",
            "position": "relative"}}>
        <ul style={{"listStyleType": "none",
            "margin": "0",
            "padding": "0",
            "overflow": "hidden"}}>
            <li style={{"float": "left",
            "fontSize":"35px",
            "cursor":"pointer",
            "userSelect": "none"}} onClick={()=>{showSettings()}}>🔄</li>
            {<li style={{"float": "left",
                "fontSize":"35px",
                "cursor":"pointer",
                "userSelect": "none"}} onClick={()=>{showHelp()}}>❓</li>}        
        </ul>
        </div>
    )
}
export default NavBar