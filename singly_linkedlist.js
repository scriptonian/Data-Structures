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

var foodList = new LinkedList();
foodList.addToHead("pizza");
foodList.addToHead("Spinach");
foodList.addToHead("Corn");
foodList.size();
console.log(foodList);

/*
LinkedList.prototype.removeHead = function() {

};
*/