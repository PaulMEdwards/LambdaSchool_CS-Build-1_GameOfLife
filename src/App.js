import React, {
  useState
  ,useRef
  ,useCallback
  // ,useHotkeys
} from "react";
import produce from "immer";

import "./App.scss";

const dims = {
  grid: {
    rows: 25,
    cols: 50,
    deep: 50,
  },
  cell: 15,
  speed: 250,
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
  for (let i = 0; i < dims.grid.rows; i++) {
    data.push(Array.from(Array(dims.grid.cols), () => (
      random ? Math.random() > 0.67 ? 1 : 0 : 0
    )));
  }
  return data;
}

function App() {
  const [grid, setGrid] = useState(() => {return populateGrid()});

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // Simulate Generation
    setGrid((g) => {
      return produce(g, newGrid => {
        for (let r = 0; r < dims.grid.rows; r++) {
          for (let c = 0; c < dims.grid.cols; c++) {
            let neighbors = 0;
            ops.forEach(([x,y]) => {
              const R = r + x;
              const C = c + y;
              if (R >= 0 && R < dims.grid.rows && C >= 0 && C < dims.grid.cols) {
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
    setTimeout(runSimulation, dims.speed);
    // eslint-disable-next-line
  }, []);

  const toggleRunning = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  // // HotKeys Keyboard Shortcuts
  // useHotkeys('shift+r', () => setGrid(populateGrid(true)));
  // useHotkeys('shift+c', () => setGrid(populateGrid(false)));
  // useHotkeys('shift+s', () => toggleRunning());

  return (
    <div className="App">
      <header className="header">
        <h1>Conway's Game of Life</h1>
      </header>
      <section className="body">
        <div className=".life">
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(${dims.grid.cols}, ${dims.cell}px)`
            }}
          >
            {grid.map((rows, r) => 
              rows.map((cols, c) => (
                <div
                  key={`${r}x${c}`}
                  className=".life.cell"
                  style={{
                    width: dims.cell,
                    height: dims.cell,
                    backgroundColor: grid[r][c] ? "white" : undefined,
                    border: "solid 0.5px gray"
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
        <>
          <h3>Controls</h3>
          <button onClick={() => {setGrid(populateGrid(true));}}>Random</button>
          <button onClick={() => {
            setGrid(populateGrid(false));
            if (running) toggleRunning();
            dims.generation = 0;
          }}>Clear</button>
          <button
            onClick={() => {
              toggleRunning();
            }}
          >{running ? `Stop`: `Start`}</button>
          <h5>Generation: {dims.generation}</h5>
        </>
      </footer>
    </div>
  );
}

export default App;
