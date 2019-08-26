import InputsList from '../InputsList';
import ISorter from "../../services/Sorting/ISorter";
import * as React from "react";

type SortedListSettings = {
    sorter: ISorter;
}

type SortResult =  {
    values: number[];
    result?: number[];
}

export default class SortingInputsList extends React.Component<SortedListSettings, SortResult> {
    constructor(props: SortedListSettings) {
        super(props);
        this.state = { values: [] };
    }

    componentDidUpdate(prevProps: SortedListSettings) {
        if (this.props.sorter !== prevProps.sorter) {
            this.setState((prevState: SortResult) => {
                return { ...prevState, result: null}
            });
        }
    }

    sort = () => {
        this.setState({
            result: this.props.sorter.sort(this.state.values)
        });
    };

    private onChangeValues = (values: number[]) => {
        this.setState({
            values: values
        });
    };

    render() {
        return (
            <div>
                <InputsList minValue={1} maxValue={100} onChangeValues={this.onChangeValues}/>
                <button onClick={this.sort}>Sort </button>
                {this.state.result && "Result " + this.state.result.join(",")}
            </div>
        );
    }
}