import { Button } from "./styles.js";

function MenuButton(props) {

    return (
        <Button type="button">
            {props.children}
            {props.text}
        </Button>
    )
}
export default MenuButton