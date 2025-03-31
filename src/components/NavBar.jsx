

const NavBar = ({showSettings}) => {

    return(
        <ul style={{"list-style-type": "none",
            "margin": "0",
            "padding": "0",
            "overflow": "hidden"}}>
            <li style={{"float": "left",
            "fontSize":"35px",
            "cursor":"pointer",
            "userSelect": "none"}} onClick={()=>{showSettings()}}>🔄</li>
            {/*<li style={{"float": "left",
                "fontSize":"35px",
                "cursor":"pointer",
                "userSelect": "none"}} onClick={()=>{}}>⚙️</li>*/}        
        </ul>
    )
}
export default NavBar