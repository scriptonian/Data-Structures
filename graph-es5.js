function Graph() {
    this.vertices = [];
    this.adjacentList = new Map();
    this.numberOfEdges = 0;
}

Graph.prototype = {
    addVertex: function(v){
        //push vertex into the a vertices array
        this.vertices.push(v);
        //for each new vertex we add we need to create an empty array with
        //holds the connections to the list
        this.adjacentList.set(v, []);
    },
    //helper method for getting a vertex from the adjacency list
    getAdjacencyListVertex(vertex) {
        return this.adjacentList.get(vertex);        
    },
    //our edges hold connections to vertices. this adds an edge from vertex 
    //U to vertex V. this means that V will be in the adjacency list of U
    addEdge: function(u, v) {
        //first get the u vertex to you can push into its list
        var uVertex = this.getAdjacencyListVertex(u),
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
    },

    breathFirstSearch: function(startingVertex) {
        var color = [],
            distances = [],
            edgeTo = [],          
            queue = new Queue(),
            isEmptyQueue = true,
            //create an array of object
            setVertexColorsAndEdges = function() {
                for(var i = 0; i < this.vertices.length; i++) {
                    color[this.vertices[i]] = 'white';
                    distances[this.vertices[i]] = 0;
                    edgeTo[this.vertices[i]] = null;
                }
            };
        //set colors and distances on all vertices
        setVertexColorsAndEdges();
        //enqueue vertex onto queue
        queue.enqueue(startingVertex);
        //continously check the queue and performs the following operations
        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            var queueFrontVertex = queue.dequeue();
            //set the color to grey since is now visited
            color[queueFrontVertex] = 'grey';
            //get its adjacency list
            var frontVertexAdjLst = this.getAdjacencyListVertex(queueFrontVertex);
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
            //console.log(queueFrontVertex + ' was visited');
        }
        //Output Shortest distance based on number of hops
        for (var i in distances) {
            //console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        return {
            distances : distances,
            edgeTo : edgeTo
        };   
    },

    vertexExist: function(v) {
        return this.vertices.indexOf(v) === 0;
    },

    shortestPathToAll: function(fromVertex, bfs) {
        if(!this.vertexExist(fromVertex)) {
            return console.log('Starting Vertex not found');
        }

        for(var i = 0; i < this.vertices.length; i++) {
            var currentVertex = this.vertices[i];
            var finalPath = new Stack();
            for(var j = currentVertex; j !== fromVertex; j = bfs.edgeTo[j]) {
                finalPath.push(j);
            }
            //finally push the starting vertex to stack
            finalPath.push(fromVertex);
            var vStrings = finalPath.pop();
            while(!finalPath.isEmpty()) {
                vStrings += ' - ' + finalPath.pop();
            }
            console.log(vStrings);
        }
    },

    shortestPathFromTo: function(fromVertex, toVertex) {
        var queue = new Queue();
        queue.enqueue(fromVertex);
        var visited = [];
        visited[fromVertex] = true;
        var paths = [];

        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            var queueFrontVertex = queue.dequeue();
            var edges = this.getAdjacencyListVertex(queueFrontVertex);
            //console.log(edges);
            for(var i = 0; i < edges.length; i++) {
                var currentEdge = edges[i];
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

        var finalPath = [];
       
        for(var j = toVertex; j !== fromVertex; j = paths[j]) {
            finalPath.push(j);
        }
        
        //finally push the starting vertex to stack
        finalPath.push(fromVertex);

        var pathString = finalPath.reverse().join('-');
        return pathString;
    },

    toString: function() {
        //mapValues is used to store all map values. which are arrays
        //we dont use the .values method here since that returns a
        //Map Iterator which is not so easy to work with in ES5,
        //but for ES2015 and beyond it will be much easier. For ES5
        //we use a foreach
        var mapValues = [];
        this.adjacentList.values().forEach(function(value, key, map) {
            mapValues.push(value);
        });

        //go through vertices and 
        for(var i = 0; i < vertices.length; i++) {
            var keyStr = '',
                valueStr = '';
            keyStr += vertices[i] + " -> ";
            for(var j = 0; j < mapValues[i].length; j++) {
                valueStr += mapValues[i][j];
            }
            keyStr += valueStr;
            console.log(keyStr);
            valueStr = '';
        }
    }
};

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
//var shortestPathFromTo = graph.shortestPathFromTo('T', 'F');
//console.log("Path String: ", shortestPathFromTo);