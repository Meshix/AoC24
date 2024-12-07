import { readInput } from '../utils/inputReader';

export function solvePart1(input: string): number {
    type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
    type GridCell = '#' | '.' | '^';
    type DirectionVector = Record<Direction, [number, number]>;

    const directions: DirectionVector = {
        'UP': [-1, 0],
        'RIGHT': [0, 1],
        'DOWN': [1, 0],
        'LEFT': [0, -1]
    };

    const grid: GridCell[][] = input.split('\n').map(line => 
        line.split('') as GridCell[]
    );

    // Find starting position
    let startRow = 0;
    let startCol = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '^') {
                startRow = row;
                startCol = col;
                break;
            }
        }
    }

    let currentRow: number = startRow;
    let currentCol: number = startCol;
    let currentDir: Direction = 'UP';

    const visited = new Set<string>();

    // Maybe we shouldn't count the starting position?
    // visited.add(`${currentRow},${currentCol}`);

    while (true) {
        const [deltaRow, deltaCol] = directions[currentDir];
        const nextRow = currentRow + deltaRow;
        const nextCol = currentCol + deltaCol;

        if (nextRow < 0 || nextRow >= grid.length || 
            nextCol < 0 || nextCol >= grid[0].length) {
            console.log(`Breaking at position ${currentRow},${currentCol} going ${currentDir}`);
            console.log(`Would have moved to ${nextRow},${nextCol}`);
            break;
        }

        if (grid[nextRow][nextCol] === '#') {
            const savedRow = currentRow;
            const savedCol = currentCol;
            currentRow = nextRow;
            currentCol = nextCol;

            if (grid[currentRow][currentCol] === '#') {
                currentRow = savedRow;
                currentCol = savedCol;
                currentDir = turnRight(currentDir);
            }
        } else {
            currentRow = nextRow;
            currentCol = nextCol;
            visited.add(`${currentRow},${currentCol}`);
        }
    }

    function turnRight(dir: Direction): Direction {
        const turns: Record<Direction, Direction> = {
            'UP': 'RIGHT',
            'RIGHT': 'DOWN',
            'DOWN': 'LEFT',
            'LEFT': 'UP'
        };
        return turns[dir];
    }

    return visited.size;
}
export function solvePart2(input: string): number {
    return 0
}

if (require.main === module) {
    const input = readInput("D6");
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}