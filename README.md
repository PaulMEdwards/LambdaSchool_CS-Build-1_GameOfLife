# Lambda School - CS Build 1 - Game of Life

[Cellular Automata and Conway's "Game of Life"](https://github.com/LambdaSchool/CS-Build-Week-1#cellular-automata-and-conways-game-of-life)

## Decisions

- Initially create a 2D game, but work towards implementing a 3D game area using [ThreeJS](https://threejs.org/).
  - [Basics of ThreeJS Slide Deck](http://fhtr.org/BasicsOfThreeJS/)
- Use recursive calculation with memoization (caching) for performance: [Hashlife](https://en.wikipedia.org/wiki/Hashlife) or similar.
  - [An Algorithm for Compressing Space and Time - Dr. Dobb's](https://www.drdobbs.com/jvm/an-algorithm-for-compressing-space-and-t/184406478)
- [Build backend API using Flask](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)

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



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
