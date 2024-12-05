import { readInput } from '../utils/inputReader';

interface Graph {
    [key: number]: number[];
}

export function parseInput(input: string): [Graph, number[][]] {
    // Split the input into lines
    const lines = input.trim().split('\n');
    
    // Find where the graph part ends (first line with a comma)
    const separatorIndex = lines.findIndex(line => line.includes(','));
    
    // Split into graph lines and array lines
    const graphLines = lines.slice(0, separatorIndex);
    const arrayLines = lines.slice(separatorIndex);
    
    // Parse graph
    const graph: Graph = {};
    for (const line of graphLines) {
        // Skip empty lines
        if (!line.trim()) continue;
        
        const [src, dst] = line.split('|').map(Number);
        // Validate that both src and dst are valid numbers
        if (!isNaN(src) && !isNaN(dst)) {
            if (!graph[src]) {
                graph[src] = [];
            }
            graph[src].push(dst);
        }
    }
    
    // Parse arrays
    const arrays = arrayLines.map(line => 
        line.split(',').map(Number)
    );
    
    return [graph, arrays];
}

export function solvePart1(input: string): number {
    const [graph, arrays] = parseInput(input);
    let count: number = 0;

    for(const array of arrays){
        let isValid: boolean = true;
        
        for(let i = 0; i < array.length; i++){
            // Get remaining elements after current index
            const remainingElements = array.slice(i + 1);
            
            // Check if current number is in the value list of any remaining number
            for(const element of remainingElements) {
                if (graph[element] && graph[element].includes(array[i])) {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) break;
        }
        
        if (isValid){
            const middleIndex = Math.floor(array.length / 2);
            count += array[middleIndex];
        }
    }
    return count;
}

export function solvePart2(input: string): number {
    const [graph, arrays] = parseInput(input);
    let count: number = 0;

    for(const array of arrays){
        let needsFixing = false;
        
        // Check if array needs fixing
        for(let i = 0; i < array.length; i++){
            for(let j = i + 1; j < array.length; j++){
                if (graph[array[j]] && graph[array[j]].includes(array[i])) {
                    // Swap the elements
                    [array[i], array[j]] = [array[j], array[i]];
                    needsFixing = true;
                }
            }
        }

        // After fixing, verify if it's now valid
        let isValidAfterFix = true;
        for(let i = 0; i < array.length && isValidAfterFix; i++){
            for(let j = i + 1; j < array.length && isValidAfterFix; j++){
                if (graph[array[j]] && graph[array[j]].includes(array[i])) {
                    isValidAfterFix = false;
                }
            }
        }

        // Only count if we fixed it AND it's now valid
        if (needsFixing && isValidAfterFix) {
            const middleIndex = Math.floor(array.length / 2);
            count += array[middleIndex];
        }
    }
    return count;
}

if (require.main === module) {
    const input = readInput('D5');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}