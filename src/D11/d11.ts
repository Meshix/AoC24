import {readInput} from '../utils/inputReader';

function splitEvenDigits(num: number): number[] {
    const result: number[] = [];
        const str = num.toString();
        if (str.length % 2 === 0) {
            const mid = str.length / 2;
            result.push(parseInt(str.slice(0, mid)));
            result.push(parseInt(str.slice(mid)));
        }    
    return result;
}

export function solvePart1(input: string): number{
    let array: Array<number> = input.split(' ').map(Number);
    const seen: {[id: number]: Array<number>} = {0:[1], 1:[2024], 2024: [20, 24]}

    for(let i = 0; i<25; i++){
        let newArray: Array<number> = [];
        for(const e of array){
            if(e in seen){
                newArray.push(...seen[e]);
                continue;
            }
            if(e.toString().length % 2 == 0){
                const splitDigits = splitEvenDigits(e);
                newArray.push(...splitDigits)
                seen[e] = splitDigits;
            }
            else{
                newArray.push(e * 2024);
                seen[e] = [e*2024];
            }
        }        
        array = newArray;
    }
    return array.length;
}

export function solvePart2(input: string): number {
    // Initialize the frequency map with the input numbers
    let counts: { [key: number]: number } = {};
    input.split(' ').map(Number).forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
    });

    // Cache for already processed numbers
    const seen: { [key: number]: number[] } = {
        0: [1],
        1: [2024],
        2024: [20, 24]
    };

    // Perform 75 iterations
    for (let i = 0; i < 75; i++) {
        const newCounts: { [key: number]: number } = {};

        for (const numStr in counts) {
            const num = Number(numStr);
            const count = counts[num];

            let splits: number[];

            if (seen.hasOwnProperty(num)) {
                // Use cached splits if available
                splits = seen[num];
            } else {
                if (num.toString().length % 2 === 0) {
                    // Split the number if it has an even number of digits
                    splits = splitEvenDigits(num);
                } else {
                    // Otherwise, multiply by 2024
                    splits = [num * 2024];
                }
                // Cache the result
                seen[num] = splits;
            }

            // Update the newCounts with the splits
            for (const s of splits) {
                newCounts[s] = (newCounts[s] || 0) + count;
            }
        }

        // **Replace** counts with newCounts for the next iteration
        counts = newCounts;
    }

    // Calculate the total number of elements by summing all frequencies
    let total = 0;
    for (const count of Object.values(counts)) {
        total += count;
    }

    return total;
}

if (require.main === module) {
    const input = readInput('D11');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}