import * as React from "react";
import ISearcher from "../../services/Searching/ISearcher";
import SearchingInputsList from "./SearchingInputsList";

type SearchingProps = {
    searchers: Searchers
}

type Searchers = {
    [index: string]: ISearcher
}

type SearchingState = {
    searcher: ISearcher;
}

export default class SearchingView extends React.Component<SearchingProps, SearchingState> {
    constructor(props: SearchingProps) {
        super(props);
        let searcherKeys = Object.keys(this.props.searchers);
        this.state = { searcher: this.props.searchers[searcherKeys[0]] };
    }

    static getDerivedStateFromProps(nextProps: SearchingProps, prevState: SearchingState): SearchingState | null {
        if (Object.values(nextProps.searchers).indexOf(prevState.searcher) == -1) {
            let searcherKeys = Object.keys(nextProps.searchers);
            return {
                searcher: nextProps.searchers[searcherKeys[0]]
            }
        }

        return null;
    }

    private searchMethodChanged = (e: any) => {
        this.setState({
            searcher: this.props.searchers[e.target.value]
        });
    };

    render() {
        return (
            <div>
                <select onChange={this.searchMethodChanged}>
                    {Object.keys(this.props.searchers).map((indexValue: string) =>
                        <option
                            key={indexValue}
                            selected={this.props.searchers[indexValue] === this.state.searcher}
                            value={indexValue}>
                            {indexValue}
                        </option>)}
                </select>
                <SearchingInputsList searcher={this.state.searcher} />
            </div>
        );
    }
}