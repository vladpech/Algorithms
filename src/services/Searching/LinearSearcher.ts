import ISearcher from "./ISearcher";

export default class LinearSearcher implements ISearcher {
    search(numbers: number[], elementToFind: number): number | undefined {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] == elementToFind) {
                return i;
            }
        }
    }
}