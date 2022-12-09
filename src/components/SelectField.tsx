import { Component, For } from "solid-js";

interface SelectFieldProps {
    options: [display: string, value: string][];
    label?: string;
    description?: string;
}

const SelectField: Component<SelectFieldProps> = (props) => {
    return (
        <div class="field">
            <label>{props.label}</label><br />
            {props.description ? '' : <br />}
            <p></p>
            <div class="select is-rounded">
                <select>
                    <For each={props.options}>{
                        (opt) => <option value={opt[1]}>{opt[0]}</option>
                    }</For>
                </select>
            </div>
        </div>
    )
}

export default SelectField;