import * as React from "react";
import ISorter from "../../services/Sorting/ISorter";
import SortingInputsList from "./SortingInputsList";

type SortingProps = {
    sorters: Sorters
}

type Sorters = {
    [index: string]: ISorter
}

type SortingState = {
    sorter: ISorter;
}

export default class SortingView extends React.Component<SortingProps, SortingState> {
    constructor(props: any) {
        super(props);
        let sorterKeys = Object.keys(this.props.sorters);
        this.state = { sorter: this.props.sorters[sorterKeys[0]] };
    }

    static getDerivedStateFromProps(nextProps: SortingProps, prevState: SortingState): SortingState | null {
        if (Object.values(nextProps.sorters).indexOf(prevState.sorter) == -1) {
            let sorterKeys = Object.keys(nextProps.sorters);
            return {
                sorter: nextProps.sorters[sorterKeys[0]]
            }
        }

        return null;
    }

    private sortMethodChanged = (e: any) => {
        this.setState({
            sorter: this.props.sorters[e.target.value]
        });
    };

    render() {
        return (
            <div>
                <select onChange={this.sortMethodChanged}>
                    {Object.keys(this.props.sorters).map((indexValue: string) =>
                        <option
                            key={indexValue}
                            selected={this.props.sorters[indexValue] === this.state.sorter}
                            value={indexValue}>
                            {indexValue}
                            </option>)}
                </select>
                <SortingInputsList sorter={this.state.sorter}>
                </SortingInputsList>
            </div>
        );
    }
}