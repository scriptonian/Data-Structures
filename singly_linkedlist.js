function Node(element) {
    this.element = element;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.tail = null; // you can choose not to add tail

    var length = 0;
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
    removeHead: function() {},
    removeTail: function() {},
    delete: function(position) {},
    indexOf: function(element) {},
    isEmpty: function() {},
    size: function() {},
    display: function() {}
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
}

/*
var foodList = new LinkedList();
var pizzaNode = new Node("pizza");
foodList.addToHead(pizzaNode);
console.log(foodList);

var spinachNode = new Node("Spinach");
foodList.addToHead(spinachNode)
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
}

var pastaNode = new Node("Pasta");
foodList.addToTail(pastaNode);
console.log(foodList);