function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function DoublyLinkedList() {
    this.head = null;
    this.tail = null;

    this._length = 0;
}

DoublyLinkedList.prototype = {
    addToHead: function(element) {},
    addToTail: function(element) {},
    insert: function(position, element) {},
    find: function(element) {},
    findPrevious: function(element) {},
    removeHead: function() {},
    removeTail: function() {},
    remove: function(element) {},
    removeAt: function(position) {},
    indexOf: function(element) {},
    isEmpty: function() {},
    size: function() {},
    display: function() {}
};

DoublyLinkedList.prototype.addToHead = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.head) { 
        //update old heads previous to point to new node
        this.head.previous = newNode;
        //update new nodes next to point to old head
        newNode.next = this.head;
        //set the head pointer to be the new node
        //this.head = newNode;
    } else { // Linked list is empty
        this.tail = newNode;
        //set the head pointer to be the new node
        //this.head = newNode;
    }
    //set the head to the new node
    this.head = newNode;

    //increment count
    this._length++;
};

DoublyLinkedList.prototype.addToTail = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.tail) {
        //if there is already a tail, change the pointers to point to new node
        //if update the currently existing tails next to point to new node
        this.tail.next = newNode;
        newNode.previous = this.tail;
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

DoublyLinkedList.prototype.removeHead = function() {
    //if there is a head, then there is a node or possibly nodes in the list
    var headExists = this.head,
        value = null;

    if(headExists) {
        //save the current value of the head
        value = this.head.element;
        //case 1: there are multiple nodes
        if(this.head.next != null) { 
            var oldHead = this.head;
            // set the new head
            this.head = oldHead.next;
            //update the prev of the new head to point to null
            this.head.previous = null;
            //set the oldHead (previous) to null. garbage collection
            oldHead = null;
        } else { //this.head.next is a null, means there is only one node
            this.head = null;
            this.tail = null;
        }
        //since headExists
        this._length--;
    } else {
        //there is no head OR !this.head... So linked list is empty
        //return value; // no need to return null here, since that is the default value
    }
    return value;
};

DoublyLinkedList.prototype.removeTail = function() {

    var tailExists = this.tail,
        value = null;

    if(tailExists) {
        //save the current value of the tail
        value = this.tail.element;
        //check whether there is only one tail or multiple
        if(this.tail.previous !== null) {
            //in this case there are multiple nodes. update pointers
            var oldTail = this.tail;
            //update the tail to be the old tails previous node
            this.tail = oldTail.previous;
            //set the next of the tail to null
            this.tail.next = null;
        } else {
            //there is only one node in the collection
            this.head = null;
            this.tail = null;
        }
        //since tail Exists, decrement the collection count
        this._length--;
    } else {
        //return value;
    }
    //return the name of tail removed to called (we would be nice to know what was removed)
    return value;
};

