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
        this.head.prev = newNode;
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