
# Maze Pathfinding Visualizer

A React-based interactive maze generator and pathfinding algorithm visualizer built with Vite. This application demonstrates the behavior of Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms on procedurally generated mazes.

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Language**: JavaScript (JSX)
- **Styling**: CSS3
- **Development Environment**: Replit with Node.js 20

### Project Structure
```
src/
├── index.jsx          # Application entry point
├── MazeGrid.jsx       # Main component containing maze logic
└── App.css           # Styling for maze visualization

config/
├── vite.config.js     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## 🧮 Core Algorithms

### Maze Generation Algorithm
The application uses a **recursive backtracking algorithm** to generate mazes:

1. **Initialization**: Creates a grid filled with walls
2. **Starting Point**: Begins carving from position (1,1)
3. **Recursive Carving**: 
   - Marks current cell as path
   - Randomly shuffles directions [North, South, East, West]
   - For each direction, checks if target cell (2 steps away) is valid
   - If valid, carves intermediate cell and recursively continues
4. **Endpoint Setup**: Places start at (1,0) and end at (height-2, width-1)

**Time Complexity**: O(n²) where n is the grid dimension
**Space Complexity**: O(n²) for the maze matrix + O(n²) worst-case recursion stack

### Pathfinding Algorithms

#### Breadth-First Search (BFS)
```javascript
// Pseudocode
function bfs(startNode):
    queue = [startNode]
    visited = Set([startNode])
    
    while queue is not empty:
        current = queue.dequeue()
        if current is end: return true
        
        for each neighbor in [up, down, left, right]:
            if neighbor is valid and unvisited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
                visualize(neighbor)
```

**Properties**:
- **Completeness**: Guaranteed to find solution if one exists
- **Optimality**: Finds shortest path (in terms of steps)
- **Time Complexity**: O(V + E) where V = vertices, E = edges
- **Space Complexity**: O(V) for queue and visited set

#### Depth-First Search (DFS)
```javascript
// Pseudocode
function dfs(startNode):
    stack = [startNode]
    visited = Set([startNode])
    
    while stack is not empty:
        current = stack.pop()
        if current is end: return true
        
        for each neighbor in [up, down, left, right]:
            if neighbor is valid and unvisited:
                visited.add(neighbor)
                stack.push(neighbor)
                visualize(neighbor)
```

**Properties**:
- **Completeness**: May not find solution in infinite spaces
- **Optimality**: Does not guarantee shortest path
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V) worst case, O(h) average where h = max depth

## 🎨 Visualization System

### Cell States
The maze uses a state-based visualization system:

| State | Color | CSS Class | Meaning |
|-------|-------|-----------|---------|
| `wall` | Black | `.cell.wall` | Impassable barrier |
| `path` | White | `.cell.path` | Walkable corridor |
| `start` | Green | `.cell.start` | Algorithm starting point |
| `end` | Red | `.cell.end` | Target destination |
| `visited` | Light Blue | `.cell.visited` | Explored by algorithm |

### Animation System
- **Timing**: 100ms delay between each step visualization
- **State Management**: Uses React's `setTimeout` with cleanup
- **Memory Management**: Maintains array of timeout IDs for proper cleanup

## 🔧 Component Architecture

### MazeGrid Component
**Props**:
- `width` (default: 10): Maze width in cells
- `height` (default: 10): Maze height in cells

**State Variables**:
```javascript
const [maze, setMaze] = useState([])        // 2D array representing maze state
const [timeoutIds, setTimeoutIds] = useState([]) // Timeout cleanup management
```

**Key Methods**:
- `generateMaze(height, width)`: Creates new maze using recursive backtracking
- `bfs(startNode)`: Executes breadth-first search with visualization
- `dfs(startNode)`: Executes depth-first search with visualization
- `refreshMaze()`: Clears timeouts and generates new maze

## 🚀 Performance Considerations

### Optimization Strategies
1. **Immutable State Updates**: Uses functional state updates to prevent unnecessary re-renders
2. **Timeout Management**: Proper cleanup prevents memory leaks
3. **CSS Grid**: Efficient rendering using flexbox layout
4. **React.StrictMode**: Development-time optimization checks

### Scalability Limits
- **Recommended Size**: 10x10 to 50x50 grids
- **Memory Usage**: O(n²) for maze storage
- **Render Performance**: Linear with cell count

## 🛠️ Development Setup

### Prerequisites
- Node.js 20.x
- npm or yarn package manager

### Installation & Running
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- **Host**: 0.0.0.0 (accessible externally)
- **Port**: 5173 (Vite default)
- **Hot Reload**: Enabled via Vite HMR

## 🔬 Algorithm Comparison

| Aspect | BFS | DFS |
|--------|-----|-----|
| **Path Quality** | Optimal (shortest) | Suboptimal |
| **Memory Usage** | Higher (queue) | Lower (stack) |
| **Exploration Pattern** | Level-by-level | Deep corridors first |
| **Use Cases** | Shortest path finding | Maze solving, tree traversal |
| **Visual Pattern** | Expanding circles | Winding paths |

## 🧪 Testing Scenarios

### Test Cases
1. **Small Maze (5x5)**: Quick algorithm comparison
2. **Large Maze (20x20)**: Performance testing
3. **Narrow Corridors**: Algorithm behavior analysis
4. **Multiple Solutions**: Path preference observation

### Expected Behaviors
- **BFS**: Should explore uniformly outward from start
- **DFS**: Should follow one path deeply before backtracking
- **Both**: Should find valid paths when they exist

## 📊 Complexity Analysis

### Space Complexity Breakdown
```
Total Memory = Maze Storage + Algorithm Storage + React Overhead
             = O(n²) + O(n²) + O(1)
             = O(n²)
```

### Time Complexity Breakdown
```
Maze Generation: O(n²)
Pathfinding: O(V + E) = O(n²) for grid graphs
Visualization: O(path_length × animation_delay)
```

## 🔮 Future Enhancements

### Potential Features
1. **Additional Algorithms**: A*, Dijkstra's, Greedy Best-First
2. **Weighted Graphs**: Variable movement costs
3. **Maze Algorithms**: Prim's, Kruskal's for different maze types
4. **Performance Metrics**: Step count, time taken, memory usage
5. **Interactive Features**: Click to add/remove walls
6. **Export/Import**: Save/load maze configurations

### Technical Debt
- Add TypeScript for better type safety
- Implement proper error boundaries
- Add unit tests for algorithms
- Optimize re-rendering with React.memo
- Add accessibility features (ARIA labels, keyboard navigation)
