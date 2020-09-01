import React, {
  useState
  ,useEffect
  ,useRef
  ,useCallback
  // ,useHotkeys
} from "react";
import produce from "immer";

import {
  Container
  ,Row
  ,Col
  ,Tabs
  ,Tab
  ,Button
  ,ButtonGroup
  ,SplitButton
  ,Dropdown
} from "react-bootstrap";

// import Slider from "react-input-slider";

// import Grid from "./components/life/grid";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const defaults = {
  grid: {
    size: 32,
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
};

let generation = 0;
let speed = 250;

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

function App() {
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   });
  // }, []);

  const [data, setData] = useState(defaults);
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  // useEffect(() => {
  //   console.log("data.speed.value", data.speed.value);
  //   // Delay for configured duration in ms
  //   // const delay = data.speed.max - data.speed.value;
  //   // // console.log(`runSimulation -> delay`, delay);
  //   // // setData({
  //   // //   ...data,
  //   // //   speed: {
  //   // //     delay: delay,
  //   // //   },
  //   // // });
  //   setDelay(data.speed.max - data.speed.value);
  //   // eslint-disable-next-line
  // }, [data.speed.value]);

  const [speedState, setSpeed] = useState(data.speed.value);
  useEffect(() => {
    console.log("speedState", speedState);
    // setDelay(data.speed.max - speedState);
    speed = speedState;
    // eslint-disable-next-line
  }, [speedState]);

  // // const [delay, setDelay] = useState(data.speed.max - data.speed.value);
  // const [delay, setDelay] = useState(data.speed.max - speed);
  // useEffect(() => {
  //   console.log("delay", delay);
  // }, [delay]);

  // const [generation, setGeneration] = useState(0);
  // useEffect(() => {
  //   console.log("generation", generation);
  // }, [generation]);

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const populateGrid = (random = false) => {
    const d = [];
    for (let i = 0; i < data.grid.size; i++) {
      d.push(Array.from(Array(data.grid.size), () => (
        random ? Math.random() > 0.6 ? 1 : 0 : 0
      )));
    }
    return d;
  }

  const [grid, setGrid] = useState(() => {return populateGrid()});
  // useEffect(() => {
  //   console.log("grid", grid);
  // }, [grid]);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // Delay for configured duration in ms
    // const delay = data.speed.max - data.speed.value;
    const delay = data.speed.max - speed;
    console.log(`runSimulation -> delay`, delay);

    // const d = delay;
    // console.log(`runSimulation -> delay`, d);

    // Increment generation counter
    generation += 1;

    // Simulate Generation
    setGrid((g) => {
      // console.log(`runSimulation -> setGrid`);
      return produce(g, newGrid => {
        // console.log(`runSimulation -> g`, g);
        const gX = g ? g.length : 0;
        const gY = g[0] ? g[0].length : 0;
        // console.log(`g Size: ${gX}x${gY}=${gX*gY}`);
        for (let r = 0; r < gX; r++) {
          for (let c = 0; c < gY; c++) {
            let neighbors = 0;
            ops.forEach(([x,y]) => {
              const R = r + x;
              const C = c + y;
              if (R >= 0 && R < gX && C >= 0 && C < gY) {
                neighbors += g[R][C];
                // console.log(`R(${R})=r(${r})+x(${x}), C(${C})=c(${c})+y(${y}), neighbors(${neighbors})+=g[${R}][${C}]=${g[R][C]}`);
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

    // console.log(`setTimeout(runSimulation, ${d});`);
    console.log(`setTimeout(runSimulation, ${delay});`);
    setTimeout(runSimulation, delay);
    // setTimeout(runSimulation, d);
    // eslint-disable-next-line
  }, []);

  const toggleRunning = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  const clearGrid = async () => {
    if (running) toggleRunning();
    setGrid(populateGrid(false));
    console.log(`clearGrid -> generation`, 0);
    generation = 0;
  }

  useEffect(() => {
    console.log("grid size", data.grid.size);
    clearGrid();
    // eslint-disable-next-line
  }, [data.grid.size]);

  const randomizeGrid = async () => {
    setGrid(populateGrid(true));
  }

  const reset = async () => {
    console.log("resetting to defaults...");
    setData({
      ...data,
      grid: {
        size: defaults.grid.size,
        min: defaults.grid.min,
        max: defaults.grid.max,
        step: defaults.grid.step,
      },
      cell: {
        size: defaults.cell.size,
        min: defaults.cell.min,
        max: defaults.cell.max,
        step: defaults.cell.step,
      },
      speed: {
        value: defaults.speed.value,
        min: defaults.speed.min,
        max: defaults.speed.max,
        step: defaults.speed.step,
      },
    });
    // speed = 250;
    setSpeed(250);
  }

  // // HotKeys Keyboard Shortcuts
  // useHotkeys('shift+r', () => setGrid(populateGrid(true)));
  // useHotkeys('shift+c', () => setGrid(populateGrid(false)));
  // useHotkeys('shift+s', () => toggleRunning());

  return (
    // <p>The current time is {currentTime}.</p>
    <Container as="div" className="App">
      <Row>
        <Col>
          <Row as="section" className="body">
            <Col as="div" className="controls tabGroup" style={{marginTop: "1em"}}>
              <Tabs defaultActiveKey="controls" id="tab-group" className="tabGroup">
                <Tab eventKey="controls" title="Controls" className="tabGroup controls">
                  <h3>Generation: <span className="accent">{generation}</span></h3>

                  <h4>Controls</h4>
                  <ButtonGroup>
                    <Button onClick={() => {clearGrid();}}>Clear</Button>
                    <Button onClick={() => {toggleRunning();}}>{running ? `Stop`: `Start`}</Button>
                  </ButtonGroup>

                  <h4>Presets</h4>
                  <SplitButton
                    key="Random"
                    title="Random"
                    id="Preset-Random"
                    onClick={() => {randomizeGrid();}}
                  >
                    <Dropdown.Item eventKey="1">Square</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Cross</Dropdown.Item>
                    <Dropdown.Item eventKey="3">X</Dropdown.Item>
                    <Dropdown.Item eventKey="4">?</Dropdown.Item>
                  </SplitButton>

                  <div className="parameters">
                    <h4>Parameters</h4>
                    <Button onClick={() => {reset();}}>Reset</Button>

                    {/* <div className="sliderLabel">Speed: <span className="accent">{data.speed.value / 10}</span></div> */}
                    <div className="sliderLabel">Speed: <span className="accent">{speed / 10}</span></div>
                    <input
                      type="range"
                      // value={data.speed.value}
                      value={speed}
                      min={data.speed.min}
                      max={data.speed.max}
                      step={data.speed.step}
                      onChange={e => {
                        const s = parseInt(e.target.value, 10);
                        console.log(`speed`, s);
                        // speed = s;
                        // data.speed.value = s;
                        // setData({...data,
                        //   speed: {
                        //     ...data.speed,
                        //     value: s,
                        //   },
                        // });
                        setSpeed(s);
                      }}
                    />

                    <div className="sliderLabel">Cell Size: <span className="accent">{data.cell.size}</span></div>
                    <input
                      type="range"
                      value={data.cell.size}
                      min={data.cell.min}
                      max={data.cell.max}
                      step={data.cell.step}
                      onChange={e => {
                        const c = parseInt(e.target.value, 10);
                        setData({...data,
                          cell: {
                            ...data.cell,
                            size: c,
                          },
                        });
                        console.log(`c`, c);
                        console.log("data.cell.size", data.cell.size);
                      }}
                    />

                    <div className="sliderLabel">
                      Grid Size: <span className="accent">{data.grid.size}</span><sup>2</sup>=<span className="accent">{(data.grid.size**2).toLocaleString('en-US')}</span> cells
                    </div>
                    <input
                      type="range"
                      value={data.grid.size}
                      min={data.grid.min}
                      max={data.grid.max}
                      step={data.grid.step}
                      onChange={e => {
                        if (running) toggleRunning();
                        const g = parseInt(e.target.value, 10);
                        setData({...data,
                          grid: {
                            ...data.grid,
                            size: g,
                          },
                        });

                        console.log(`g`, g);
                        console.log("data.grid.size", data.grid.size);

                        console.log(`set Grid Size -> (new generation value)`, 0);
                        // setGeneration(0);
                        generation = 0;

                        // Handled by useEffect on data.grid.size
                        // setGrid(populateGrid(false));
                        // clearGrid();
                      }}
                    />
                  </div>
                </Tab>
                <Tab eventKey="about" title="About" className="tabGroup about">
                  <h3>About</h3>
    
                  <p>
                    <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">John Conway's "Game of Life"</a> is a computer science classic from 1970, a program that simulates a <em>cellular automaton</em> (plural <em>automata</em>). It has connections to all kinds of different aspects of computer science and nature.
                  </p>

                  <h5>Rules</h5>
                  <p>
                    The universe of the Game of Life is an infinite, two-dimensional <a href="https://en.wikipedia.org/wiki/Orthogonality">orthogonal</a> grid of square cells, each of which is in one of two possible states, <em>alive</em> or <em>dead</em>, (or <em>populated</em> and <em>unpopulated</em>, respectively). Every cell interacts with its eight <a href="https://en.wikipedia.org/wiki/Moore_neighborhood">neighbors</a>, which are the cells that are horizontally, vertically, or diagonally adjacent.
                  </p>

                  <p>
                    At each step in time, the following transitions occur:
                  </p>

                  <ol>
                    <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                  </ol>

                  <p>
                    These rules, which compare the behavior of the automaton to real life, can be condensed into the following:
                  </p>

                  <ol>
                    <li>Any live cell with two or three live neighbors survives.</li>
                    <li>Any dead cell with three live neighbors becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                  </ol>

                  <p>
                    The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
                  </p>

                  <h4>Examples</h4>

                  <img src="https://camo.githubusercontent.com/a710386de69bcb8577875246196c7fb07144ff0c/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f3456565a547654717a5252304255774e49482f67697068792e676966" alt="Animated Examples" style={{width: "100%"}} />
                </Tab>
              </Tabs>
            </Col>
            <Col as="div" className="life">
              <Row as="header" className="header">
                <Col as="h1" className="title">
                  Conway<span className="accent">'</span>s <span className="accent">Game</span> of <span className="accent">Life</span>
                </Col>
              </Row>
              <Row as="div"
                fluid="xl"
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${data.grid.size}, ${data.cell.size}px)`,
                }}
              >
                {/* <Grid /> */}
                {grid.map((rows, r) => 
                  rows.map((cols, c) => (
                    <div
                      key={`${r}x${c}`}
                      className="cell"
                      style={{
                        width: data.cell.size,
                        height: data.cell.size,
                        backgroundColor: grid[r][c] ? "white" : undefined,
                      }}
                      onClick={() => {
                        if (!running) {
                          const newGrid = produce(grid, gridCopy => {
                            gridCopy[r][c] = !grid[r][c];
                          });
                          setGrid(newGrid);
                        }
                      }}
                    />
                  ))
                )}
              </Row>
              <Row as="footer" className="footer">
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
