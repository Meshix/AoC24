import { readInput } from '../utils/inputReader';

function makeDisk(input: string): Array<number>{
    let alternates: boolean = true; // true = file, false = free space
    let disk: Array<number> = [];
    let counter: number = 0;
    for(const c of input){
        const num: number = Number(c);
        if(alternates){
            disk.push(...Array(num).fill(counter));
            counter += 1;
        }
        else{
            disk.push(...Array(num).fill(-1));  
        }
        alternates = !alternates;
    }
    return disk;
}

export function solvePart1(input: string): number {
    let disk: Array<number> = makeDisk(input);

    let i = 0;
    while (i < disk.length) {
        if (disk[i] === -1) {
            let temp;
            do {
                temp = disk.pop();
            } while (temp === -1 && disk.length > i);

            if (temp !== undefined && temp !== -1) {
                disk[i] = temp;
                i++;
            }
        } else {
            i++;
        }
    }

    const sum = disk.reduce((acc, value, index) => {
        return acc + (value * index);
    }, 0);
    return sum;
}

export function solvePart2(input: string): number {
    let disk = makeDisk(input);
    
    let element = Math.max(...disk);
    
    while (element !== 0) {
        const count = disk.filter(x => x === element).length;
        let index = 0;
        
        while (index < disk.length) {
            if (disk[index] === -1) {
                let consecutiveSpaces = 0;
                while ((index + consecutiveSpaces) < disk.length && 
                       disk[index + consecutiveSpaces] === -1) {
                    consecutiveSpaces++;
                }

                if (consecutiveSpaces >= count) {
                    // First, clear original positions from right to left
                    let found = 0;
                    for (let i = disk.length - 1; i >= index + count; i--) {
                        if (disk[i] === element) {
                            disk[i] = -1;
                            found++;
                        }
                    }
                    
                    // Then fill the space with current element
                    for (let i = 0; i < found; i++) {
                        disk[index + i] = element;
                    }
                    break;
                }
            }
            index++;
        }
        element--;
    }

    const sum = disk.reduce((acc, value, index) => {
        return value !== -1 ? acc + (value * index) : acc;
    }, 0);

    return sum;
}

if (require.main === module) {
    //const input = "2333133121414131402"; //test
    const input = readInput('D9');
    console.log('Part 1:', solvePart1(input));
    console.log('Part 2:', solvePart2(input));
}