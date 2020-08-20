# Lambda School - CS Build 1 - Game of Life

[Cellular Automata and Conway's "Game of Life"](https://github.com/LambdaSchool/CS-Build-Week-1#cellular-automata-and-conways-game-of-life)

## Decisions

- Initially create a 2D game, but work towards implementing a 3D game area using [ThreeJS](https://threejs.org/).
  - [Basics of ThreeJS Slide Deck](http://fhtr.org/BasicsOfThreeJS/)
- Use recursive calculation with memoization (caching) for performance: [Hashlife](https://en.wikipedia.org/wiki/Hashlife) or similar.
  - [An Algorithm for Compressing Space and Time - Dr. Dobb's](https://www.drdobbs.com/jvm/an-algorithm-for-compressing-space-and-t/184406478)

## Ideas

- Have a library of patterns to place. Support rotation and drag & drop.
- Implement user settable settings & use logical branching based on the setting values to perform calculations:
  - Determine how edges are handled.
  - Toggle between [Moore](https://en.wikipedia.org/wiki/Moore_neighborhood) & [von Neumann [extended]](https://en.wikipedia.org/wiki/Von_Neumann_neighborhood) neighborhoods.
- Cycle through RGB color hues for each successive generation "born".
  - [Colorized Life](http://www.ericweisstein.com/encyclopedias/life/ColorizedLife.html)
- Optionally represent cells as semi-transparent spheres or micro-cellular organisms. Possibly use sprites for performance.
- Use [dat.gui](https://github.com/dataarts/dat.gui) for lightweight controls UI?
- Implement board & CA as Voxels using [VoxelJS](http://www.voxeljs.com/) / [new VoxelJS-Next library](https://github.com/joshmarinacci/voxeljs-next)?
- "Tetris" Easter-Egg?

### Literature

- [Wikipedia: Cellular Automation](https://en.wikipedia.org/wiki/Cellular_automaton)
- [Wikipedia: Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [The Nature of Code: Chapter 7. Cellular Automata](https://natureofcode.com/book/chapter-7-cellular-automata/)
- [An Algorithm for Compressing Space and Time - Dr. Dobb's](https://www.drdobbs.com/jvm/an-algorithm-for-compressing-space-and-t/184406478)
- [Gosper's Algorithm (Hashlife) - An explanation of how the hashlife algorithm reduces processing time and effort for cellular automata evaluation.](https://jennyhasahat.github.io/hashlife.html)
- [GAME DEVELOPMENT > PROGRAMMING > Creating Life: Conway's Game of Life](https://gamedevelopment.tutsplus.com/tutorials/creating-life-conways-game-of-life--gamedev-558)

### Reference Implementations

- [Play Game of Life](https://playgameoflife.com/)
- [Golly](http://golly.sourceforge.net/)
- [UniSim](https://www.pygame.org/project/1849/3232)
- [Game of Voxels JS](https://github.com/mvaleriani/Game-of-Voxels-JS)
