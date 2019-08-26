import * as React from "react";
import InputsList from "../InputsList";
import ISearcher from "../../services/Searching/ISearcher";

type SearchListSettings = {
    searcher: ISearcher;
}

type SearchResult =  {
    values: number[];
    elementToFind?: number;
    foundIndex?: number;
}

export default class SearchingInputsList extends React.Component<SearchListSettings, SearchResult> {
    constructor(props: SearchListSettings) {
        super(props);
        this.state = { values: [] };
    }

    componentDidUpdate(prevProps: SearchListSettings) {
        if (this.props.searcher !== prevProps.searcher) {
            this.setState((previousState: SearchResult) => {
                return {...previousState, foundIndex: null} as SearchResult
            });
        }
    }

    find = () => {
        if (!this.state.elementToFind) {
            return;
        }

        this.setState((previousState: SearchResult, currentProps: SearchListSettings) => {
            return {
                foundIndex: currentProps.searcher.search(previousState.values, previousState.elementToFind)
            }
        });
    };

    private onChangeElementToFind = (e:any) => {
        this.setState({
            elementToFind: parseInt(e.target.value)
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
                <input value={this.state.elementToFind} onChange={this.onChangeElementToFind}/>
                <button onClick={this.find}>Find: </button>
                {this.state.foundIndex ? `Find result, row - ${this.state.foundIndex + 1}` : 'Not found'}
            </div>
        );
    }
}