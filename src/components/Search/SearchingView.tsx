import * as React from "react";
import InputsList from "../InputsList";
import ISearcher from "../../services/Searching/ISearcher";
import SearchingInputsList from "./SearchingInputsList";

type SearchingProps = {
    Searchers: Searchers
}

type Searchers = {
    [index: string]: ISearcher
}

type SearchingState = {
    Searcher: ISearcher;
}

export default class SearchingView extends React.Component<SearchingProps, SearchingState> {
    constructor(props: any) {
        super(props);
        let searcherKeys = Object.keys(this.props.Searchers);
        this.state = { Searcher: this.props.Searchers[searcherKeys[0]] };

        this.searchMethodChanged = this.searchMethodChanged.bind(this);
    }

    static getDerivedStateFromProps(nextProps: SearchingProps, prevState: SearchingState): SearchingState | null {
        if (Object.values(nextProps.Searchers).indexOf(prevState.Searcher) == -1) {
            let searcherKeys = Object.keys(nextProps.Searchers);
            return {
                Searcher: nextProps.Searchers[searcherKeys[0]]
            }
        }

        return null;
    }

    private searchMethodChanged(e: any) {
        this.setState({
            Searcher: this.props.Searchers[e.target.value]
        });
    }

    render() {
        return (
            <div>
                <select onChange={this.searchMethodChanged}>
                    {Object.keys(this.props.Searchers).map((indexValue: string) =>
                        <option
                            key={indexValue}
                            selected={this.props.Searchers[indexValue] === this.state.Searcher}
                            value={indexValue}>
                            {indexValue}
                        </option>)}
                </select>
                <SearchingInputsList Searcher={this.state.Searcher}>
                    <InputsList minValue={1} maxValue={100} />
                </SearchingInputsList>
            </div>
        );
    }
}