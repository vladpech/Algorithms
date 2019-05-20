import ISorter from "./ISorter";

export default class MergeSort implements ISorter {
    sort(numbers: number[]): number[] {
        let arr = numbers.map(a => a);
        if (arr.length <= 1) {
            return arr;
        }

        let middle:number = Math.round(arr.length / 2);
        let left = this.sort(arr.splice(0, middle));
        let right = this.sort(arr);
        return this.merge(left, right);
    }

    private merge(left: number[], right: number[]): number[] {
        let result:number[] = [];

        while(left.length > 0 || right.length > 0)
        {
            let element: number;
            if (left.length > 0 && right.length > 0)
            {
                if (left[0] <= right[0])
                {
                    element = left.shift();
                }
                else
                {
                    element = right.shift();
                }
            }
            else if(left.length > 0)
            {
                element = left.shift();
            }
            else if (right.length > 0)
            {
                element = right.shift();
            }

            result.push(element);
        }
        return result;
    }
}