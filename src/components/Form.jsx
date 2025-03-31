import TextInput from "./TextInput"
import DropdownInput from "./DropdownInput"
import CheckboxInput from "./CheckboxInput";

function Form({form, submitCallback}) {

    function handleSubmit(e) {
        e.preventDefault();
        submitCallback(e.target)
    }

    function renderInput(input, i) {
        switch(input.type) {
            case 'text':
            case 'number':
                return <TextInput key={input.id+"-"+i} input={input}/>
            case 'dropdown':
                return <DropdownInput key={input.id+"-"+i} input={input}/>
            case 'checkbox':
                return <CheckboxInput key={input.id+"-"+i} input={input}/>
            default:
                console.error("Invalid input object")
                return
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            {form.inputs.map((input, i) => renderInput(input, i))}
            <button type="submit">Confirm</button>
        </form>
    )
}
export default Form