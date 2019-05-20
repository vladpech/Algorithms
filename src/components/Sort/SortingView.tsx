import * as React from "react";
import ISorter from "../../services/Sorting/ISorter";
import InputsList from "../InputsList";
import SortingInputsList from "./SortingInputsList";

type SortingProps = {
    Sorters: Sorters
}

type Sorters = {
    [index: string]: ISorter
}

type SortingState = {
    Sorter: ISorter;
}

export default class SortingView extends React.Component<SortingProps, SortingState> {
    constructor(props: any) {
        super(props);
        let sorterKeys = Object.keys(this.props.Sorters);
        this.state = { Sorter: this.props.Sorters[sorterKeys[0]] };

        this.sortMethodChanged = this.sortMethodChanged.bind(this);
    }

    static getDerivedStateFromProps(nextProps: SortingProps, prevState: SortingState): SortingState | null {
        if (Object.values(nextProps.Sorters).indexOf(prevState.Sorter) == -1) {
            let sorterKeys = Object.keys(nextProps.Sorters);
            return {
                Sorter: nextProps.Sorters[sorterKeys[0]]
            }
        }

        return null;
    }

    private sortMethodChanged(e: any) {
        this.setState({
            Sorter: this.props.Sorters[e.target.value]
        });
    }

    render() {
        return (
            <div>
                <select onChange={this.sortMethodChanged}>
                    {Object.keys(this.props.Sorters).map((indexValue: string) =>
                        <option
                            key={indexValue}
                            selected={this.props.Sorters[indexValue] === this.state.Sorter}
                            value={indexValue}>
                            {indexValue}
                            </option>)}
                </select>
                <SortingInputsList Sorter={this.state.Sorter}>
                    <InputsList minValue={1} maxValue={100} />
                </SortingInputsList>
            </div>
        );
    }
}