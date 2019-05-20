import ISorter from "./ISorter";

export default class QuickSort implements ISorter {
    sort(numbers: number[]): number[] {
        let items = numbers.slice();
        const left = 0;
        const right = items.length - 1;

        return this.quickSort(items, left, right);
    }

    private quickSort(items: number[], left: number, right: number): number[] {
        let index;

        if (items.length > 1) {
            index = this.partition(items, left, right);

            if (left < index - 1) {
                this.quickSort(items, left, index - 1);
            }

            if (index < right) {
                this.quickSort(items, index, right);
            }
        }

        return items;
    }

    private partition(items: number[], left: number, right: number) {
        let pivot   = items[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }

            while (items[j] > pivot) {
                j--;
            }

            if (i <= j) {
                this.swap(items, i, j);
                i++;
                j--;
            }
        }

        return i;
    }

    private swap(items: number[], firstIndex: number, secondIndex: number){
        const buff = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = buff;
    }
}