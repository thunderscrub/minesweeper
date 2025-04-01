import { useEffect } from "react";

const KeyboardListenerController = ({handleKeyPress}) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (handleKeyPress) {
            handleKeyPress(event.key);
          }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
          }
    },[handleKeyPress])

    useEffect(() => () => {})

    return null
}
export default KeyboardListenerController