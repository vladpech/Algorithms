import * as React from "react";
import Input from "./Input";

export type ChangeValuesHandler = (values: number[]) => void;

export type InputSettings = {
    minValue: number;
    maxValue: number;
    onChangeValues?: ChangeValuesHandler,
    values?: number[];
}

type InputValues = {
    values: number[];
}

export default class InputsList extends React.Component<InputSettings, InputValues> {
    constructor(props: InputSettings) {
        super(props);
        this.state = { values: this.props.values || [] };
    }

    private addInput = () => {
        this.setState((prevState: InputValues) => {
            let newState = {...prevState};
            newState.values.push(this.getRandomValue());
            return newState;
        }, () => this.applyOnChangeValues(this.state.values));
    };

    private getRandomValue = (): number => {
        let rand = this.props.minValue + Math.random() * (this.props.maxValue + 1 - this.props.minValue);
        return Math.floor(rand);
    };

    private changeValueHandler = (index: number) => {
        return (value: number) => {
            this.setState((prevState: InputValues) => {
                let newState = {...prevState};
                newState.values[index] = value;
                return newState;
            }, () => this.applyOnChangeValues(this.state.values));
        }
    };

    private applyOnChangeValues = (values: number[]) => {
        if (this.props.onChangeValues) {
            this.props.onChangeValues(values);
        }
    };

    render() {
        return (
            <div>
                <ul>
                    {this.state.values.map((value, i) => <li key={i}> <Input value={value} changeValueHandler={this.changeValueHandler(i)}/> </li>)}
                </ul>
                <button onClick={this.addInput}>Add input</button>
            </div>
        )
    }
}