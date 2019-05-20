import InputsList from '../InputsList';
import ISorter from "../../services/Sorting/ISorter";
import * as React from "react";
import {ReactElement} from "react";

type SortedListSettings = {
    children: ReactElement<InputsList>;
    Sorter: ISorter;
}

type SortResult =  {
    values: number[];
    result?: number[];
}

export default class SortingInputsList extends React.Component<SortedListSettings, SortResult> {
    constructor(props: SortedListSettings) {
        super(props);
        this.state = { values: [] };
        this.onChangeValues = this.onChangeValues.bind(this);
    }

    componentWillReceiveProps(nextProps: SortedListSettings) {
        if (this.props.Sorter !== nextProps.Sorter) {
            let newState = {... this.state};
            newState.result = null;
            this.setState(newState);
        }
    }

    sort() {
        this.setState({
            result: this.props.Sorter.sort(this.state.values)
        });
    }

    private onChangeValues(values: number[]) {
        this.setState({
            values: values
        });
    }

    render() {
        let newComponent = React.cloneElement(this.props.children, {onChangeValues: this.onChangeValues});
        return (
            <div>
                {newComponent}
                <button onClick={() => this.sort()}>Sort </button>
                {this.state.result && "Result " + this.state.result.join(",")}
            </div>
        );
    }
}