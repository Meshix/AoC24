import { readInput } from '../utils/inputReader';

export function solvePart1(input: string): number {
    const numbersPattern = /mul\((\d+),(\d+)\)/g;
    const matches = [...input.matchAll(numbersPattern)];
    const numberPairs = matches.map(match => [match[1], match[2]]);
    const total = numberPairs.reduce((sum, [a, b]) => sum + Number(a) * Number(b), 0);
    return total;
}

export function solvePart2(input: string): number {
    let isIgnoring = false;
    let total = 0;
    
    // Find don't(), do(), and mul() patterns in order
    const pattern = /(don't\(\)|do\(\)|mul\((\d+),(\d+)\))/g;
    const matches = [...input.matchAll(pattern)];
    
    for (const match of matches) {
        if (match[0] === "don't()") {
            isIgnoring = true;
        } else if (match[0] === "do()") {
            isIgnoring = false;
        } else if (!isIgnoring && match[2] && match[3]) {
            total += Number(match[2]) * Number(match[3]);
        }
    }
    
    return total;
}

if (require.main === module) {
    const input = readInput('D3');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}