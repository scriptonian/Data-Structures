class Graph {
    constructor() {
        this.vertices = [];
        this.adjacentList = new Map();
        this.numberOfEdges = 0;
    }

    addVertex(v) {
        //push vertex into the a vertices array
        this.vertices.push(v);
        //for each new vertex we add we need to create an empty array with
        //holds the connections to the list
        this.adjacentList.set(v, []);
    }

    //helper method for getting a vertex from the adjacency list
    getAdjacencyListVertex(vertex) {
        return this.adjacentList.get(vertex);
    }
    //our edges hold connections to vertices. this adds an edge from vertex 
    //U to vertext V. this means that V will be in the adjacency list of U
    addEdge(u, v) {
        //first get the u vertex to you can push into its list
        let uVertex = this.getAdjacencyListVertex(u),
            vVertex = this.getAdjacencyListVertex(v);
        
        /*
        we are working with undirected graphs here so we put both vertices
        into each others adjacency list. If this was a directed graph we
        would do either step 1 or step 2
        */
        //Step 1 : push V into U's list
        uVertex.push(v);
        //Step 2: push U into V's list
        vVertex.push(u); 
        //increment count
        this.numberOfEdges++;
    }

    breathFirstSearch(startingVertex) {
        let color = [],
            distances = [],
            edgeTo = [], 
            queue = new Queue(),
            isEmptyQueue = true,
            //create an array of object
            setVertexColorsAndEdges = () => {
                for(let i = 0; i < this.vertices.length; i++) {
                    color[this.vertices[i]] = 'white';
                    distances[this.vertices[i]] = 0;
                    edgeTo[this.vertices[i]] = null;
                }
                return color;
            };
        //set colors and distances on all vertices
        setVertexColorsAndEdges();
        //enqueue vertex onto queue
        queue.enqueue(startingVertex);
        //continously check the queue and performs the following operations
        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            let queueFrontVertex = queue.dequeue();
            //set the color to grey since is now visited
            color[queueFrontVertex] = 'grey';
            //get its adjacency list
            let frontVertexAdjLst = this.getAdjacencyListVertex(queueFrontVertex);
            frontVertexAdjLst.forEach(function(adjVertex){
                if(color[adjVertex] === 'white') {
                    //if color is white change to grey because we have now discovered it
                    color[adjVertex] = 'grey';
                    //increment count on the vertex weight
                    distances[adjVertex] = distances[queueFrontVertex] + 1;
                    //record the path that lead from one vertex to another vertex
                    edgeTo[adjVertex] = queueFrontVertex;
                    //next add this to the queue
                    queue.enqueue(adjVertex);
                }
            });
            color[queueFrontVertex] = 'black';
            console.log(queueFrontVertex + ' was visited');
        }
        //Output Shortest distance based on number of hops
        for (var i in distances) {
            //console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        return {
            distances : distances,
            edgeTo : edgeTo
        }; 
    }

    vertexExist(v) {
        return this.vertices.indexOf(v) === 0;
    }

    shortestPathToAll(fromVertex, bfs) {
        if(!this.vertexExist(fromVertex)) {
            return console.log('Starting Vertex not found');
        }

        for(let i = 0; i < this.vertices.length; i++) {
            let currentVertex = this.vertices[i],
                finalPath = new Stack();
            for(let j = currentVertex; j !== fromVertex; j = bfs.edgeTo[j]) {
                finalPath.push(j);
            }
            //finally push the starting vertex to stack
            finalPath.push(fromVertex);
            let vStrings = finalPath.pop();
            while(!finalPath.isEmpty()) {
                vStrings += ' - ' + finalPath.pop();
            }
            console.log(vStrings);
        }
    }

    shortestPathFromTo(fromVertex, toVertex) {
        let queue = new Queue(),
            visited = [],
            paths = [],
            pathString = '',
            finalPath = [];
        queue.enqueue(fromVertex);
        visited[fromVertex] = true;

        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            let queueFrontVertex = queue.dequeue(),
                edges = this.getAdjacencyListVertex(queueFrontVertex);
            //console.log(edges);
            for(let i = 0; i < edges.length; i++) {
                let currentEdge = edges[i];
                if(!visited[currentEdge]) {
                    //mark them as visited
                    visited[currentEdge] = true;
                    queue.enqueue(currentEdge);
                    paths[currentEdge] = queueFrontVertex;
                    //console.log(paths[edges[currentEdge]]);
                }
            }
        }
        
        if(!visited[toVertex]) {
            return undefined;
        }

        for(var j = toVertex; j !== fromVertex; j = paths[j]) {
            finalPath.push(j);
        }
        //finally push the starting vertex to stack
        finalPath.push(fromVertex);

        pathString = finalPath.reverse().join('-');
        return pathString;
    }

    toString() {
        //compare this to ES5. this is sooo much easier
        this.adjacentList.values().forEach(function(value, key, map) {
            console.log(`${key} => ${value}`);
        });
    }
}

//create graph
var graph = new Graph();
//create an array of vertices to add to graph
var vertices = ['K','T','J','M','N','F'];
//iterate vertices and add each vertex to the graph
vertices.map(function(vertex){
    graph.addVertex(vertex);
});

//create edge connections
graph.addEdge('K', 'T');
graph.addEdge('K', 'M');
graph.addEdge('K', 'J');
graph.addEdge('T', 'M');
graph.addEdge('J', 'M');
graph.addEdge('J', 'F');
graph.addEdge('M', 'N');
graph.addEdge('M', 'F');

//graph.toString();
//graph.breathFirstSearch('K');

var startVertex = vertices[0];
var bfs = graph.breathFirstSearch(startVertex);
graph.shortestPathToAll(startVertex, bfs);
var shortestPathFromTo = graph.shortestPathFromTo('T', 'F');
console.log("Path String: ", shortestPathFromTo);