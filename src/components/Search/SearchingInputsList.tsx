import * as React from "react";
import InputsList from "../InputsList";
import {ReactElement} from "react";
import ISearcher from "../../services/Searching/ISearcher";

type SearchListSettings = {
    children: ReactElement<InputsList>;
    Searcher: ISearcher;
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
        this.onChangeValues = this.onChangeValues.bind(this);
        this.onChangeElementToFind = this.onChangeElementToFind.bind(this);
    }

    componentWillReceiveProps(nextProps: SearchListSettings) {
        if (this.props.Searcher !== nextProps.Searcher) {
            let newState = {... this.state};
            newState.foundIndex = null;
            this.setState(newState);
        }
    }

    find() {
        if (!this.state.elementToFind) {
            return;
        }

        this.setState({
            foundIndex: this.props.Searcher.search(this.state.values, this.state.elementToFind)
        });
    }

    private onChangeElementToFind(e:any) {
        this.setState({
            elementToFind: e.target.value
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
                <input value={this.state.elementToFind} onChange={this.onChangeElementToFind}/>
                <button onClick={() => this.find()}>Find: </button>
                {this.state.foundIndex ? `Find result, row - ${this.state.foundIndex + 1}` : 'Not found'}
            </div>
        );
    }
}