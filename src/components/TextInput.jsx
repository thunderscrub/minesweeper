function TextInput({input}) {

    return(
        <>
            <label>{input.label}: </label>
            <input type={input.type} id={input.id}></input><br></br>
        </>
    )
}
export default TextInput