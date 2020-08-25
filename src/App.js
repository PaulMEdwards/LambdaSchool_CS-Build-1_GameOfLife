import React, {
  useState
  // ,useEffect
  ,useRef
  ,useCallback
  // ,useHotkeys
} from "react";
import produce from "immer";

// import Slider from "react-input-slider";

// import Grid from "./components/life/grid";

import "./App.scss";

const dims = {
  grid: {
    size: 50,
    min: 10,
    max: 100,
    step: 1,
  },
  cell: {
    size: 15,
    min: 5,
    max: 50,
    step: 5,
  },
  speed: {
    value: 250,
    min: 0,
    max: 1000,
    step: 50,
  },
  generation: 0,
};

const ops = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const populateGrid = (random = false) => {
  const data = [];
  for (let i = 0; i < dims.grid.size; i++) {
    data.push(Array.from(Array(dims.grid.size), () => (
      random ? Math.random() > 0.6 ? 1 : 0 : 0
    )));
  }
  return data;
}

function App() {
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  const [grid, setGrid] = useState(() => {return populateGrid()});

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [speed, setSpeed] = useState({ s: dims.speed.value });
  const [gridSize, setGridSize] = useState({ w: dims.grid.size });
  const [cellSize, setCellSize] = useState({ c: dims.cell.size });

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // Simulate Generation
    setGrid((g) => {
      return produce(g, newGrid => {
        for (let r = 0; r < dims.grid.size; r++) {
          for (let c = 0; c < dims.grid.size; c++) {
            let neighbors = 0;
            ops.forEach(([x,y]) => {
              const R = r + x;
              const C = c + y;
              if (R >= 0 && R < dims.grid.size && C >= 0 && C < dims.grid.size) {
                neighbors += g[R][C];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              newGrid[r][c] = 0;
            } else if (g[r][c] === 0 && neighbors === 3) {
              newGrid[r][c] = 1;
            }
          }
        }
      });
    });
    // Increment generation counter
    dims.generation += 1;
    // Delay for configured duration in ms
    setTimeout(runSimulation, dims.speed.max - dims.speed.value);
    // eslint-disable-next-line
  }, []);

  const toggleRunning = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  const clearGrid = () => {
    setGrid(populateGrid(false));
    if (running) toggleRunning();
    dims.generation = 0;
  }

  const randomizeGrid = () => {
    setGrid(populateGrid(true));
  }

  // // HotKeys Keyboard Shortcuts
  // useHotkeys('shift+r', () => setGrid(populateGrid(true)));
  // useHotkeys('shift+c', () => setGrid(populateGrid(false)));
  // useHotkeys('shift+s', () => toggleRunning());

  return (
    <div className="App">
      <header className="header">
        <h1>Conway<span className="accent">'</span>s <span className="accent">Game</span> of <span className="accent">Life</span></h1>
      </header>
      <section className="body">
        {/* <p>The current time is {currentTime}.</p> */}
        {/* <Grid /> */}
        <div className="life">
          <div
            className="grid"
            style={{
              // gridTemplateColumns: `repeat(${dims.grid.size}, ${dims.cell.size}px)`,
              gridTemplateColumns: `repeat(${(dims.grid.size + dims.grid.size) / 2}, ${dims.cell.size}px)`,
            }}
          >
            {grid.map((rows, r) => 
              rows.map((cols, c) => (
                <div
                  key={`${r}x${c}`}
                  className="cell"
                  style={{
                    width: dims.cell.size,
                    height: dims.cell.size,
                    backgroundColor: grid[r][c] ? "white" : undefined,
                  }}
                  onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[r][c] = !grid[r][c];
                    });
                    setGrid(newGrid);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <footer className="footer">
        <h3>Controls</h3>

        <button onClick={() => {randomizeGrid();}}>Random</button>
        <button onClick={() => {clearGrid();}}>Clear</button>
        <button onClick={() => {toggleRunning();}}>{running ? `Stop`: `Start`}</button>

        <div className="parameters">

          <div className="sliderLabel">Speed: <span className="accent">{dims.speed.value / 10}</span></div>
          <input
            type="range"
            value={dims.speed.value}
            min={dims.speed.min}
            max={dims.speed.max}
            step={dims.speed.step}
            onChange={e => {
              const s = parseInt(e.target.value, 10);
              dims.speed.value = s;
              setSpeed(({ v }) => s);
              console.log(`s`, s);
              console.log("dims.speed.value", dims.speed.value);
              console.log("speed", speed);
            }}
          />

          <div className="sliderLabel">Cell Size: <span className="accent">{dims.cell.size}</span></div>
          <input
            type="range"
            value={dims.cell.size}
            min={dims.cell.min}
            max={dims.cell.max}
            step={dims.cell.step}
            onChange={e => {
              const c = parseInt(e.target.value, 10);
              dims.cell.size = c;
              setCellSize(({ v }) => c);
              console.log(`c`, c);
              console.log("dims.cell.size", dims.cell.size);
              console.log("cellSize", cellSize);
            }}
          />

          <div className="sliderLabel">Grid Size: <span className="accent">{dims.grid.size * dims.grid.size}</span></div>
          <input
            type="range"
            value={dims.grid.size}
            min={dims.grid.min}
            max={dims.grid.max}
            step={dims.grid.step}
            onChange={e => {
              const w = parseInt(e.target.value, 10);
              dims.grid.size = w;
              setGridSize(({ v }) => w);
              clearGrid();
              console.log(`w`, w);
              console.log("dims.grid.size", dims.grid.size);
              console.log("gridSize", gridSize);
            }}
          />
          
        </div>

        <h5>Generation: <span className="accent">{dims.generation}</span></h5>
      </footer>
    </div>
  );
}

export default App;
