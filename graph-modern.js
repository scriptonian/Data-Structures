class Graph {
    constructor() {
        this.vertices = [];
        this.adjacentList = new Map();
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
    }

    breathFirstSearch(startingVertex) {
        let color = [],
            queue = new Queue(),
            that = this,
            isEmptyQueue = true,
            //create an array of object
            setVertexColors = () => {
                for(let i = 0; i < that.vertices.length; i++) {
                    color[that.vertices[i]] = 'white';
                }
                return color;
            };
        //set colors on all vertices
        setVertexColors();
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
                    //next add this to the queue
                    queue.enqueue(adjVertex);
                }
            });
            color[queueFrontVertex] = 'black';
            console.log(queueFrontVertex + ' was visited');
        }
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
graph.breathFirstSearch('K');