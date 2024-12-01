import { readInput } from '../utils/inputReader';

function parseInput(input: string): number[][] {
    return input
        .trim()
        .split('\n')
        .map(line => line.split(/\s+/))
        .reduce((acc, [left, right]) => {
            acc[0].push(Number(left));
            acc[1].push(Number(right));
            return acc;
        }, [[], []] as number[][]);
}

export function solvePart1(input: string): number {
    const [leftColumn, rightColumn] = parseInput(input);
    
    let sortedL = [...leftColumn].sort((a, b) => a - b);
    let sortedR = [...rightColumn].sort((a, b) => a - b);

    const differences = sortedL.map((leftNum, i) => Math.abs(leftNum - sortedR[i]));
    return differences.reduce((sum, diff) => sum + diff, 0);
}

export function solvePart2(input: string): number {
    const [leftColumn, rightColumn] = parseInput(input);

    const countsL: {[key: number] : number} = {};
    for (const num of leftColumn){
        countsL[num] = countsL[num] ? countsL[num] + 1 : 1;
    }

    const countsR: {[key: number] : number} = {};
    for (const num of rightColumn){
        countsR[num] = countsR[num] ? countsR[num] + 1 : 1;
    }

    let similarityScore: number = 0;
    for (const num in countsL){
        similarityScore += countsL[num] * Number(num) * (countsR[num] || 0);
    }
    
    return similarityScore;
}

if (require.main === module) {
    const input = readInput('D1');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}