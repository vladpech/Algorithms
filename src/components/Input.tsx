import * as React from "react";

export type ChangeValueHandler = (value: number) => void;

interface InputSettings {
    value: number;
    changeValueHandler?: ChangeValueHandler;
}

type InputValue = {
    value: number;
}

export default class Input extends React.Component<InputSettings, InputValue> {
    constructor(props: InputValue) {
        super(props);
        this.state = {value: props.value}
    }

    private changeValue = (e: any) => {
        let value = parseFloat(e.target.value);
        this.setState({value: value});

        if (this.props.changeValueHandler) {
            this.props.changeValueHandler(value);
        }
    };

    render() {
        return <input type="text" onChange={this.changeValue} value={this.state.value}/>
    }
}