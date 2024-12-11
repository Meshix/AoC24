import { readInput } from '../utils/inputReader';

type Point = [number, number];

function findZeros(grid: string[][]): Point[] {
    const zeros: Point[] = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '0') {
                zeros.push([row, col]);
            }
        }
    }
    return zeros;
}

function sumAllTrailheadScores(grid: string[][]): number {
    const zeros = findZeros(grid);
    let totalScore = 0;
    
    for (const zero of zeros) {
        const reachableNines = new Set<string>();
        findReachableNines(grid, zero, reachableNines);
        totalScore += reachableNines.size;
    }
    
    return totalScore;
}

function findReachableNines(
    grid: string[][], 
    start: Point, 
    reachableNines: Set<string>
) {
    const seen = new Set<string>();
    
    function dfs(current: Point, currentNum: number) {
        const [row, col] = current;
        const key = `${row},${col}`;
        
        if (seen.has(key)) return;
        if (grid[row][col] === '.') return;
        
        if (grid[row][col] === '9') {
            reachableNines.add(key);
            return;
        }
        
        seen.add(key);
        
        const directions: Point[] = [
            [row-1, col],
            [row+1, col],
            [row, col-1],
            [row, col+1]
        ];
        
        const nextNum = (currentNum + 1) % 10;
        
        for (const [newRow, newCol] of directions) {
            if (
                newRow >= 0 && 
                newRow < grid.length && 
                newCol >= 0 && 
                newCol < grid[0].length && 
                grid[newRow][newCol] === String(nextNum)
            ) {
                dfs([newRow, newCol], nextNum);
            }
        }
        
        seen.delete(key);
    }
    
    dfs(start, 0);
}

export function solvePart1(input: string): number {
    const grid = input.split('\n').map(line => line.split(''));
    return sumAllTrailheadScores(grid);
}

export function solvePart2(input: string): number {
    const grid = input.split('\n').map(line => line.split(''));
    return sumAllTrailheadRatings(grid);
}

type Path = Point[];

function sumAllTrailheadRatings(grid: string[][]): number {
    const zeros = findZeros(grid);
    let totalRating = 0;
    
    for (const zero of zeros) {
        const distinctPaths = findDistinctPaths(grid, zero);
        totalRating += distinctPaths.size;
    }
    
    return totalRating;
}

function findDistinctPaths(grid: string[][], start: Point): Set<string> {
    const distinctPaths = new Set<string>();
    const seen = new Set<string>();
    
    function dfs(current: Point, currentNum: number, path: Path) {
        const [row, col] = current;
        const key = `${row},${col}`;
        
        if (seen.has(key)) return;
        if (grid[row][col] === '.') return;
        
        path.push(current);
        
        if (grid[row][col] === '9') {
            distinctPaths.add(pathToString(path));
            path.pop();
            return;
        }
        
        seen.add(key);
        
        const directions: Point[] = [
            [row-1, col],
            [row+1, col],
            [row, col-1],
            [row, col+1]
        ];
        
        const nextNum = (currentNum + 1) % 10;
        
        for (const [newRow, newCol] of directions) {
            if (
                newRow >= 0 && 
                newRow < grid.length && 
                newCol >= 0 && 
                newCol < grid[0].length && 
                grid[newRow][newCol] === String(nextNum)
            ) {
                dfs([newRow, newCol], nextNum, path);
            }
        }
        
        seen.delete(key);
        path.pop();
    }
    
    dfs(start, 0, []);
    return distinctPaths;
}

function pathToString(path: Path): string {
    return path.map(([row, col]) => `${row},${col}`).join('|');
}

if (require.main === module) {
    const input = readInput('D10');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}