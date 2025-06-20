import './App.css';
import React, { useEffect, useState } from "react";

export default function MazeGrid({width = 10, height = 10}) {


  const [maze, setMaze] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([0, 1]);

  useEffect(() => {
    generateMaze(height, width);
  }, [])

  function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set([`${startNode[0]},${startNode[1]}`]);

    function visitedCell([x, y]) {
      setMaze((prevMaze)=>  prevMaze.map((row, rowIndex) =>  row.map((cell, cellIndex) =>{
        if(rowIndex === y && cellIndex === x){
          return cell === 'end' ? 'end':'visited';
        }
        return cell;
      })
      ))
      if (maze[y][x] === 'end') {
        console.log("BFS: path found");
        return true;
      }
      return false;
    }

    function step() {
      if (queue.length === 0) {
        console.log("BFS: no path");
        return false;
      }

      const [x, y] = queue.shift();
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (
          nx >= 0 && ny >= 0 &&
          nx < maze[0].length && ny < maze.length &&
          !visited.has(`${nx},${ny}`) &&
          (maze[ny][nx] === 'path' || maze[ny][nx] === 'end')
        ) {
          visited.add(`${nx},${ny}`);
          if (visitedCell([nx, ny])) return true;
          queue.push([nx, ny]);
        }
      }
      const timeoutIds = setTimeout(step, 100);
      setTimeoutIds((prevTimeoutIds) => [...prevTimeoutIds, timeoutIds]);
      
    }

    return step();
  }

  function dfs(startNode) {
    let stack = [startNode];
    let visited = new Set([`${startNode[0]},${startNode[1]}`]);

    function visitedCell([x, y]) {
      setMaze((prevMaze)=>  prevMaze.map((row, rowIndex) =>  row.map((cell, cellIndex) =>{
        if(rowIndex === y && cellIndex === x){
          return cell === 'end' ? 'end':'visited';
        }
        return cell;
      })
      ))
      if (maze[y][x] === 'end') {
        console.log("DFS: path found");
        return true;
      }
      return false;
    }

    function step() {
      if (stack.length === 0) {
        console.log("DFS: no path");
        return false;
      }

      const [x, y] = stack.pop();
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (
          nx >= 0 && ny >= 0 &&
          nx < maze[0].length && ny < maze.length &&
          !visited.has(`${nx},${ny}`) &&
          (maze[ny][nx] === 'path' || maze[ny][nx] === 'end')
        ) {
          visited.add(`${nx},${ny}`);
          if (visitedCell([nx, ny])) return true;
          stack.push([nx, ny]);
        }
      }
      const timeoutIds = setTimeout(step, 100);
      setTimeoutIds((prevTimeoutIds) => [...prevTimeoutIds, timeoutIds]);
    }

    return step();
  }

  function generateMaze(height, width) {
    let matrix = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => "wall")
    );

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function is_valid(x, y) {
      return (
        y >= 0 && x >= 0 &&
        x < width && y < height &&
        matrix[y][x] === "wall"
      );
    }

    function carve_path(x, y) {
      matrix[y][x] = "path";
      const directions = dirs.sort(() => Math.random() - 0.5);
      for (let [dx, dy] of directions) {
        let nx = x + dx * 2;
        let ny = y + dy * 2;
        if (is_valid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carve_path(nx, ny);
        }
      }
    }

    carve_path(1, 1);
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";
    setMaze(matrix);
  }

  function refreshMaze(){
     timeoutIds.forEach(clearTimeout);
     setTimeoutIds([]);
     generateMaze(height, width);
  }
  return (
    <div className="maze-grid">
      <div className="controls">
        <button className="maze-button" onClick={() => refreshMaze(10, 10)}>
          Refresh Maze
        </button>
        <button className="maze-button" onClick={() => bfs([0, 1])}>
          Breadth First Search
        </button>
        <button className="maze-button" onClick={() => dfs([0, 1])}>
          Depth First Search
        </button>
      </div>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`} key={cellIndex}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}