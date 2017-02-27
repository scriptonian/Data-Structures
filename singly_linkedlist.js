function Node(element) {
    this.element = element;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.tail = null; // you can choose not to add tail

    this._length = 0;
}

/*
var foodList = new LinkedList(),
    pizzaNode = new Node("pizza", null);
console.log(foodList);
console.log(pizzaNode);
*/

LinkedList.prototype = {
    addToHead: function(element) {},
    addToTail: function(element) {},
    insert: function(position, element) {},
    find: function(element) {},
    findPrevious: function(element) {},
    removeHead: function() {},
    removeTail: function() {},
    delete: function(position) {},
    indexOf: function(element) {},
    isEmpty: function() {},
    size: function() {},
    display: function() {}
};

LinkedList.prototype.size = function() {
    return "LinkedList Size Is: " + this._length;
};

LinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};

LinkedList.prototype.addToHead = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.head) { 
        newNode.next = this.head;
        //this.head = newNode;
    } else { // Linked list is empty
        this.tail = newNode;
        //this.head = newNode;
    }
    //set the head to the new node
    this.head = newNode;

    //increment count
    this._length++;
};

/*
var foodList = new LinkedList();
foodList.addToHead("pizza");
console.log(foodList);

foodList.addToHead("Spinach")
console.log(foodList);
*/

LinkedList.prototype.addToTail = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.tail) {
        //if there is already a tail, change the pointers to point to new node
        //if update the currently existing tails next to point to new node
        this.tail.next = newNode;
        //then finally update the linked list tail to be the new node
        //this.tail = newNode;
    } else {
        //if there is no tail, then there is no head
        this.head = newNode
        //if there is no tail. make LinkedList tail the new node
        //this.tail = newNode;
    }

    this.tail = newNode;
    //increment count
    this._length++;
};

/*
foodList.addToTail("Pasta");
console.log(foodList);
*/

LinkedList.prototype.removeHead = function() {
    //if there is a head, then there is a node or possibly nodes in the list
    var headExists = this.head;
    if(headExists) {

        //save the current value of the head
        var value = this.head.element;

        //case 1: there are multiple nodes
        if(this.head.next != null) { 
            var temp = this.head;
            // there is another node so set that to the head
            this.head = this.head.next;
            //set the temp (previous) to null
            temp = null;
        } else { 
            //this.head.next is a null, means there is only one node
            this.head = null;
            this.tail = null;
        }
        //since headExists
        this._length--;
    } else {
        //there is no head OR !this.head... So linked list is empty
        return null;
    }

    return value;
};

//Test remove addToHead
/*
var foodList = new LinkedList();
foodList.addToHead("pizza");
foodList.addToHead("Spinach");
foodList.addToHead("Pasta");
foodList.removeHead();
foodList.size();
console.log(foodList);
*/

LinkedList.prototype.findPrevious = function(item) {
    //start search from the beginning
    var currentNode = this.head;

    while(currentNode.next != null) {
        if(currentNode.next == item) {
            return currentNode;
        }
        currentNode = currentNode.next
    }
    return currentNode;
};

LinkedList.prototype.removeTail = function() {
    var previousNode = this.findPrevious(this.tail);

    /*
    Two things are possible if there is a previous node.
        1) there is only one node in the linked list
        2) there are multiple nodes
    */

    //case 1. there is only one node because next is null
    if(previousNode.next === null) {
        //reset both head and tail to null
        this.head = null;
        this.tail = null;
    } else { //case 2 (multiple nodes)
        //update the next node (tail) to be null
        previousNode.next = null;
        //set the previousNode as the new tail
        this.tail = previousNode;
    }

    this._length--;
};
/*
var numList = new LinkedList();
numList.addToTail("100");
numList.addToTail("200");
numList.addToTail("300");
numList.addToTail("400");
numList.removeTail();
numList.display();
*/

LinkedList.prototype.find = function(item) {
    var currentNode = this.head;
    while(currentNode) {
        if(currentNode.element === item) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }
    return null;
    /*
    //Another way to write this is
    var currentNode = this.head;
    while(currentNode.element != item){
        currentNode = currentNode.next;
    }
    return currentNode;
    */
};

LinkedList.prototype.display = function() {
    var currentNode = this.head;
    while(currentNode) {
        console.log(currentNode.element);
        currentNode = currentNode.next;
    }
};

LinkedList.prototype.insert = function(position, element) {
    //create the new node based on the name passed
    var newNode = new Node(element);
    //find the position or item node we want to insert after.
    var positionNode = this.find(position);
    //if the position node is found update pointers
    if (positionNode != null) {
        //first set the next pointer of new node to be that of position nodes next
        newNode.next = positionNode.next;
        //finally update the positionNode's next to be the new node
        positionNode.next = newNode;
        this._length++;
    } else {
        //position not found, return error
        throw new Error("Position Node Doesnt Exist!");
    }
};

//Testing insert
/*
var peopleList = new LinkedList();
peopleList.addToTail("Kofi");
peopleList.addToTail("Tani");
peopleList.addToTail("Julie");
peopleList.insert("Tani", "Tarik");
peopleList.insert("Julie", "Charles");
peopleList.insert("Ben", "James");
peopleList.size();
peopleList.display();
console.log(peopleList);
*/