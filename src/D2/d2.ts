import { readInput } from '../utils/inputReader';

function isValidSequence(arr: number[]): boolean {
    let isIncreasing = true;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= arr[i-1] || arr[i] - arr[i-1] > 3) {
            isIncreasing = false;
            break;
        }
    }
    
    let isDecreasing = true;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= arr[i-1] || arr[i-1] - arr[i] > 3) {
            isDecreasing = false;
            break;
        }
    }

    return isDecreasing || isIncreasing;
}

export function solvePart1(input: string): number {
    const reports: number[][] = input
        .split('\n')
        .map(line => line
            .split(' ')
            .map(num => parseInt(num, 10))
        );
            
        const validSequences = reports.reduce((count, line) =>
            count + (isValidSequence(line) ? 1 : 0), 0);

        return validSequences;
}

export function solvePart2(input: string): number {
    const reports: number[][] = input
        .split('\n')
        .map(line => line
            .split(' ')
            .map(num => parseInt(num, 10))
        );

    let counter: number = 0;
            
    for(const arr of reports) {
        if (isValidSequence(arr)) {
            counter++;
            continue;
        }

        for (let i = 0; i < arr.length; i++) {
            const newArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
            if (isValidSequence(newArr)) {
                counter++;
                break;
            }
        }
    }       

    return counter;
}

if (require.main === module) {
    const input = readInput('D2');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}