export default interface ISearcher {
    search(numbers: number[], elementToFind: number): number | undefined;
}