import ISearcher from "./ISearcher";
import QuickSort from "../Sorting/QuickSort";

export default class BinarySearcher implements ISearcher {
    search(numbers: number[], elementToFind: number): number | undefined {
        let sorter = new QuickSort();
        let sortedNumbers = sorter.sort(numbers);
        let lowIndex = 0;
        let highIndex = sortedNumbers.length - 1;
        while (lowIndex <= highIndex) {
            var midIndex = Math.floor((lowIndex + highIndex) / 2);
            if (sortedNumbers[midIndex] == elementToFind) {
                return midIndex;
            } else if (sortedNumbers[midIndex] < elementToFind) {
                lowIndex = midIndex + 1;
            } else {
                highIndex = midIndex - 1;
            }
        }
    }
}