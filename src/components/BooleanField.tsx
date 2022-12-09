import { Component } from "solid-js";

interface BooleanFieldProps {
    checked?: boolean;
    label?: string;
}

let id = 0;

const BooleanField: Component<BooleanFieldProps> = (props) => {
    const myId = `switchRounded${id++}`;
    return (
        <div class="field">
            <input id={myId} type="checkbox" name="switchRoundedDefault" class="switch is-rounded" checked={props.checked} />
            <label for={myId}>{props.label}</label>
        </div>
    )
}

export default BooleanField;