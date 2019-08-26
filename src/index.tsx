import * as React from "react";
import * as ReactDOM from "react-dom";
import MergeSort from "./services/Sorting/MergeSort";
import QuickSort from "./services/Sorting/QuickSort";
import LinearSearcher from "./services/Searching/LinearSearcher";
import SortingView from "./components/Sort/SortingView";
import BinarySearcher from "./services/Searching/BinarySearcher";
import SearchingView from "./components/Search/SearchingView";


document.addEventListener("DOMContentLoaded", () =>{
    const sortingMethods = {
        MergeSort: new MergeSort(),
        QuickSort: new QuickSort()
    };

    const searchingMethods = {
        BinarySearcher: new BinarySearcher(),
        LinearSearcher: new LinearSearcher()
    };

    ReactDOM.render(
        <div className="process-view">
            <SortingView sorters={sortingMethods}/>
            <SearchingView searchers={searchingMethods}/>
        </div>,
        document.getElementsByTagName("body")[0]
    );
});

