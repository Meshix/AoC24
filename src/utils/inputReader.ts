import { readFileSync } from 'fs';
import { join } from 'path';

export function readInput(day: string): string {
    return readFileSync(join(__dirname, '..', day, 'input.txt'), 'utf-8');
}