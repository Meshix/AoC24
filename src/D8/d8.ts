import { readInput } from '../utils/inputReader';

function isCollinear(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): boolean {
    return Math.abs((y2 - y1) * (x3 - x1) - (y3 - y1) * (x2 - x1)) < 1e-10;
}

function parseGrid(input: string): string[][] {
    return input.split('\n').map(line => line.split(''));
}

function findAntinodes(grid: string[][], mode: 'part1' | 'part2'): number {
    // Collect antennas by their frequency
    const antennas = new Map<string, [number, number][]>();
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] !== '.') {
                if (!antennas.has(grid[y][x])) {
                    antennas.set(grid[y][x], []);
                }
                antennas.get(grid[y][x])!.push([x, y]);
            }
        }
    }

    const antinodes = new Set<string>();

    for (const [_, locations] of antennas) {
        // Generate all pairs of locations using combinations
        for (let i = 0; i < locations.length; i++) {
            for (let j = i + 1; j < locations.length; j++) {
                const [x1, y1] = locations[i];
                const [x2, y2] = locations[j];

                if (mode === 'part1') {
                    const dx = x2 - x1;
                    const dy = y2 - y1;

                    // Calculate two potential antinodes
                    const antinode1 = [x1 + 2 * dx, y1 + 2 * dy];
                    const antinode2 = [x1 - dx, y1 - dy];

                    for (const [ax, ay] of [antinode1, antinode2]) {
                        if (ax >= 0 && ax < grid[0].length && ay >= 0 && ay < grid.length) {
                            antinodes.add(`${Math.round(ax)},${Math.round(ay)}`);
                        }
                    }
                } else { // part2
                    // Check every point in the grid for collinearity
                    for (let y = 0; y < grid.length; y++) {
                        for (let x = 0; x < grid[0].length; x++) {
                            if ((x === x1 && y === y1) || (x === x2 && y === y2)) {
                                continue;
                            }

                            if (isCollinear(x1, y1, x2, y2, x, y)) {
                                antinodes.add(`${x},${y}`);
                            }
                        }
                    }

                    // Add original antenna positions if there are multiple antennas
                    if (locations.length > 1) {
                        antinodes.add(`${x1},${y1}`);
                        antinodes.add(`${x2},${y2}`);
                    }
                }
            }
        }
    }

    return antinodes.size;
}

export function solvePart1(input: string): number {
    const grid = parseGrid(input);
    return findAntinodes(grid, 'part1');
}

export function solvePart2(input: string): number {
    const grid = parseGrid(input);
    return findAntinodes(grid, 'part2');
}

// Test cases
const sampleInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`.trim();

function testSampleInput() {
    const expected1 = 14;
    const expected2 = 34;
    const result1 = solvePart1(sampleInput);
    const result2 = solvePart2(sampleInput);
    
    console.log(`Part 1 Test Case - Expected: ${expected1}, Got: ${result1}`);
    console.log(`Part 2 Test Case - Expected: ${expected2}, Got: ${result2}`);
    
    if (result1 === expected1 && result2 === expected2) {
        console.log('✅ All Tests Passed!');
    } else {
        console.log('❌ Some Tests Failed.');
    }
}

if (require.main === module) {
    testSampleInput();
    const input = readInput('D8');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}