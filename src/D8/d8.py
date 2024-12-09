#
#   Advent of Code 2024 - Day 8
#   Francesco Peluso - @francescopeluso on GitHub
#   Repo:         https://github.com/francescopeluso/AOC24
#   My website:   https://francescopeluso.xyz
#

import itertools

def read_input():
    with open('input.txt', 'r') as file:
        grid = [list(line.strip()) for line in file]
    return grid

def is_collinear(x1, y1, x2, y2, x3, y3):
  return abs((y2 - y1) * (x3 - x1) - (y3 - y1) * (x2 - x1)) < 1e-10

def find_antinodes(grid, mode):
  antennas = {}
  for y in range(len(grid)):
    for x in range(len(grid[0])):
      if grid[y][x] != '.':
        antennas.setdefault(grid[y][x], []).append((x, y))
  
  antinodes = set()
  
  for freq, locations in antennas.items():
    if mode == 'part1':
      for (x1, y1), (x2, y2) in itertools.combinations(locations, 2):
        dx, dy = x2 - x1, y2 - y1
              
        antinode1 = (x1 + 2*dx, y1 + 2*dy)
        antinode2 = (x1 - dx, y1 - dy)
              
        for ax, ay in [antinode1, antinode2]:
          if (0 <= ax < len(grid[0]) and 0 <= ay < len(grid)):
            antinodes.add((int(ax), int(ay)))
      
    elif mode == 'part2':
      for (x1, y1), (x2, y2) in itertools.combinations(locations, 2):
        for y in range(len(grid)):
          for x in range(len(grid[0])):
            if (x, y) == (x1, y1) or (x, y) == (x2, y2):
              continue
                    
            if is_collinear(x1, y1, x2, y2, x, y):
              antinodes.add((x, y))
              
          if len(locations) > 1:
            antinodes.update([(x1, y1), (x2, y2)])
  
  return len(antinodes)


def first_part(grid):
  return find_antinodes(grid, 'part1')


def second_part():
  return find_antinodes(grid, 'part2')


if __name__ == "__main__":
  grid = read_input()
  

  print("First part result: " + str(first_part(grid)))
  print("Second part result: " + str(second_part()))
  print()