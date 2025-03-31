function CheckboxInput({input}) {

    return(
        <>
            <label>{input.label}: </label>
            <input type="checkbox" id={input.id}>
                
            </input><br></br>
        </>
    )
}
export default CheckboxInput