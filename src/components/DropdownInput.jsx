function DropdownInput({input}) {

    return(
        <>
            <label>{input.label}: </label>
            <select type="dropdown" id={input.id}>
                {input.options.map((option, i) => {
                    return <option key={option+"-"+i} value={option}>{option}</option>
                })}
            </select><br></br>
        </>
    )
}
export default DropdownInput