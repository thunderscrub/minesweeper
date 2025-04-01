import Sound from "./Sound"

const NavBar = ({showSettings, showHelp, isSound, toggleSound}) => {

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
            <li style={{"float": "left",
                "fontSize":"35px",
                "cursor":"pointer",
                "userSelect": "none"}} onClick={()=>{showHelp()}}>❓</li>    
            <Sound isSound={isSound} toggleSound={toggleSound} />    
        </ul>
        </div>
    )
}
export default NavBar