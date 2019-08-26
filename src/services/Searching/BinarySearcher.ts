import ISearcher from "./ISearcher";
import QuickSort from "../Sorting/QuickSort";

type OriginalMapping = { [id: number] : number; };

export default class BinarySearcher implements ISearcher {
    search(numbers: number[], elementToFind: number): number | undefined {
        let sorter = new QuickSort();
        let sortedNumbers = sorter.sort(numbers);
        let mapping = this.createOriginalMapping(numbers, sortedNumbers);
        let lowIndex = 0;
        let highIndex = sortedNumbers.length - 1;
        while (lowIndex <= highIndex) {
            let midIndex = Math.floor((lowIndex + highIndex) / 2);
            if (sortedNumbers[midIndex] == elementToFind) {
                return mapping[midIndex];
            } else if (sortedNumbers[midIndex] < elementToFind) {
                lowIndex = midIndex + 1;
            } else {
                highIndex = midIndex - 1;
            }
        }
    }

    private createOriginalMapping = (originalList: number[], sortedList: number[]) : OriginalMapping  => {
        let mapping: OriginalMapping = {};

        sortedList.forEach((value: number, index: number) => {
            mapping[index] = originalList.indexOf(value);
        });

        return mapping;
    }
}