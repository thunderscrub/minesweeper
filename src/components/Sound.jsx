

const Sound = ({isSound, toggleSound}) => {
    
    return(<li style={{"float": "left",
        "fontSize":"35px",
        "cursor":"pointer",
        "userSelect": "none"}} onClick={()=>{toggleSound()}}>{isSound?"🔈":"🔇"}</li>)
}

export default Sound