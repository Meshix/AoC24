import { readInput } from '../utils/inputReader';

export function solvePart1(input: string): number {
    let total = 0;

    const lines = input.split('\n');
    for (const line of lines) {
        const [resultStr, numbersStr] = line.split(': ');
        const result = parseInt(resultStr);
        const numbers = numbersStr.split(' ').map(Number);

        if (isValid(numbers, result)) {
            total += result;
        }
    }

    return total;

    function isValid(numbers: number[], target: number): boolean {
        // For n numbers, we need n-1 operators
        // Each operator can be + or *, so we try all combinations
        const combinations = 1 << (numbers.length - 1); // 2^(n-1) combinations

        for (let i = 0; i < combinations; i++) {
            let value = numbers[0];
            
            // Try this combination of operators
            for (let j = 0; j < numbers.length - 1; j++) {
                // Check if bit j is set to determine if we use + or *
                const useAddition = (i & (1 << j)) !== 0;
                
                if (useAddition) {
                    value += numbers[j + 1];
                } else {
                    value *= numbers[j + 1];
                }
            }

            if (value === target) {
                return true;
            }
        }

        return false;
    }
}

export function solvePart2(input: string): number {
    let sum = 0;

    const lines = input.split('\n');
    for (const line of lines) {
        const [resultStr, numbersStr] = line.split(': ');
        const target = parseInt(resultStr);
        const numbers = numbersStr.split(' ').map(Number);

        if (isValid(numbers, target)) {
            sum += target;
        }
    }

    return sum;

    function isValid(numbers: number[], target: number): boolean {
        if (numbers.length === 1) return numbers[0] === target;
        
        // Try all possible operator combinations
        const numOperators = numbers.length - 1;
        const combinations = Math.pow(3, numOperators); // 3 operators: +, *, ||

        for (let i = 0; i < combinations; i++) {
            let value = numbers[0];
            let validExpression = true;

            for (let j = 0; j < numOperators; j++) {
                const operator = Math.floor((i / Math.pow(3, j)) % 3);
                const nextNum = numbers[j + 1];

                switch(operator) {
                    case 0: // Addition
                        value += nextNum;
                        break;
                    case 1: // Multiplication
                        value *= nextNum;
                        break;
                    case 2: // Concatenation
                        value = parseInt(`${value}${nextNum}`);
                        break;
                }

                if (value > Number.MAX_SAFE_INTEGER) {
                    validExpression = false;
                    break;
                }
            }

            if (validExpression && value === target) {
                return true;
            }
        }

        return false;
    }
}

if (require.main === module) {
    const input = readInput('D7');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}