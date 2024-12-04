import { readInput } from '../utils/inputReader';

function getAllLines(grid: string[][]): string[] {
    const lines: string[] = [];
    const numRows = grid.length;
    const numCols = grid[0].length;
    
    // Horizontal
    for (let row of grid) {
      lines.push(row.join(''));
    }
    
    // Vertical
    for (let col = 0; col < numCols; col++) {
      let vertical = '';
      for (let row = 0; row < numRows; row++) {
        vertical += grid[row][col];
      }
      lines.push(vertical);
    }
    
    // Diagonals (Top-Left to Bottom-Right)
    for (let k = 0; k <= numRows + numCols - 2; k++) {
      let diag = '';
      for (let row = 0; row < numRows; row++) {
        let col = k - row;
        if (col >= 0 && col < numCols) {
          diag += grid[row][col];
        }
      }
      if (diag.length >= 4) lines.push(diag);
    }
    
    // Diagonals (Bottom-Left to Top-Right)
    for (let k = -numRows + 1; k < numCols; k++) {
      let diag = '';
      for (let row = 0; row < numRows; row++) {
        let col = k + row;
        if (col >= 0 && col < numCols) {
          diag += grid[row][col];
        }
      }
      if (diag.length >= 4) lines.push(diag);
    }
    
    return lines;
  }

function findPatternsInLines(lines: string[], patterns: string[]): Array<{line: string, startIndex: number, pattern: string}> {
    const results = [];

    for (const line of lines) {
        for (const pattern of patterns) {
        let index = line.indexOf(pattern);
        while (index !== -1) {
            results.push({line, startIndex: index, pattern});
            index = line.indexOf(pattern, index + 1);
        }
        }
    }

    return results;
    }

function findXMASUsingStrings(grid: string[][]): Array<{line: string, startIndex: number, pattern: string}> {
    const patterns = ["XMAS", "SAMX"];
    const lines = getAllLines(grid);
    return findPatternsInLines(lines, patterns);
    }

export function solvePart1(input: string): number {
    const lines = input.trim().split(/\r?\n/);
    const grid: string[][] = lines.map(line => line.split(''));

    const res: any = findXMASUsingStrings(grid)
    return res.length;
}

function isXMAS(grid: string[][], x: number, y: number): boolean {
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Ensure that the center is 'A'
    if (grid[x][y] !== 'A') return false;

    // Define the relative positions for both diagonals
    const diagonals = [
        { dx1: -1, dy1: -1, dx2: 1, dy2: 1 },  // Top-Left to Bottom-Right
        { dx1: -1, dy1: 1, dx2: 1, dy2: -1 },  // Top-Right to Bottom-Left
    ];

    for (const diag of diagonals) {
        const x1 = x + diag.dx1;
        const y1 = y + diag.dy1;
        const x2 = x + diag.dx2;
        const y2 = y + diag.dy2;

        // Check boundaries
        if (
            x1 < 0 || y1 < 0 || x1 >= numRows || y1 >= numCols ||
            x2 < 0 || y2 < 0 || x2 >= numRows || y2 >= numCols
        ) {
            return false; // Out of bounds, cannot form X-MAS
        }

        const first = grid[x1][y1];
        const second = grid[x2][y2];

        // Check for 'M' and 'S' in any order
        if (!(
            (first === 'M' && second === 'S') ||
            (first === 'S' && second === 'M')
        )) {
            return false; // Diagonal doesn't match X-MAS pattern
        }
    }

    // Both diagonals matched
    return true;
}

function countXMAS(grid: string[][]): number {
    let count = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let x = 0; x < numRows; x++) {
        for (let y = 0; y < numCols; y++) {
            if (grid[x][y] === 'A') {
                if (isXMAS(grid, x, y)) {
                    count++;
                }
            }
        }
    }

    return count;
}

export function solvePart2(input: string): number {
    const lines = input.trim().split(/\r?\n/);
    const grid: string[][] = lines.map(line => line.split(''));
    const xmasCount = countXMAS(grid);
    console.log(`Total X-MAS occurrences: ${xmasCount}`);
    return xmasCount;
}

if (require.main === module) {
    const input = readInput('D4');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}