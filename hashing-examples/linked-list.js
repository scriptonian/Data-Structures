/*
Linked List based on Doubly Linked List Implemenation. Some methods have been modified a bit
To work with the HashTable Linear probing algorithm.
*/

function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LinkedList() {
    this.head = null;
    this.tail = null;

    this._length = 0;
}

LinkedList.prototype = {
    addToHead: function(element) {},
    addToTail: function(element) {},
    insert: function(position, element) {},
    insertEnhanced : function(position, element){},
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

LinkedList.prototype.addToHead = function(element) {
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

LinkedList.prototype.addToTail = function(element) {
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

LinkedList.prototype.removeHead = function() {
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

LinkedList.prototype.removeTail = function() {

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

//this finds and items based on name of element. This method has been modified to work with hash tables
LinkedList.prototype.find = function(item) {
    //console.log('finding... ' + item);
    var currentNode = this.head;
    var nodeList = [];
    //console.log('current head of linked list is ' + currentNode.element);
    while(currentNode) {
        //console.log('current node key: ' + currentNode.element.key);
        //console.log('current node value: ' + currentNode.element.value);
        if(currentNode.element.key === item) {
            //console.log('found something ' + currentNode.element.value);
            nodeList.push(currentNode);
        }
        currentNode = currentNode.next;
    }
    return nodeList;
};

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

//Updated insert method. (i prefer the enhanced insert see below)
LinkedList.prototype.insert = function(position, element) {
   //create the new node based on the name passed
   var newNode = new Node(element);
   //find the position or item node we want to insert after.
   var positionNode = this.find(position);
   //if the position node is found update pointers
   if (positionNode != null) {
     //first set the next pointer of new node to be that of position nodes next.
     //since the new node has no next and previous, we use the position nodes next/prev
     newNode.next = positionNode.next;
     //update the previous pointer in doubly linked list
     newNode.previous = positionNode;
     //finally update the positionNode's next to be the new node
     positionNode.next = newNode;

     this._length++;
   } else {
     //position not found, return error
     throw new Error("Position Node Doesnt Exist!");
   }
};

//NEW INSERT METHOD
LinkedList.prototype.insertEnhanced = function(position, element) {
    var length = this._length - 1,
        positionNode,
        withinBounds = this.withinBounds(position, length);
        
    if(withinBounds) {
        //create the new node based on the name passed
        var newNode = new Node(element),
            currentNode = this.head,
            currentIndex = 0;

        //if position is 0 then it means remove from Head. no need to reach loop
        if(position === 0) {
            //means remove the head and returns what was removed
            return this.addToHead();
        } else if(position === length) {
            //remove the tail
            return this.addToTail();
        }  else {
            //its not the head or tail, in which case we loop thru the collection
            //to find the position
            positionNode = this.findPositionNode(position);
            console.log('position node is : ' + positionNode.element);
            if(positionNode !== null){
                //we have the position node, lets update the pointers
                newNode.next = positionNode.next;
                //update the previous pointer in doubly linked list
                newNode.previous = positionNode;
                //finally update the positionNode's next to be the new node
                positionNode.next = newNode;
                //update length
                this._length++;
            }
        }
    } else { //not within bounds
        throw new Error('Position Not Within Bounds');
    }
}

LinkedList.prototype.withinBounds = function(position, length) {
    return (position > -1 && position <= length);
}

//this is very similar to the find method. i would refactor this method so there is only one find method
// you can perhaps do a type check. if passed in parameter is a string or number.
LinkedList.prototype.findPositionNode = function(position) {
    var currentNode, index = 0;
    currentNode = this.head;
    
    while(currentNode) {
        if(position === index) {
            return currentNode;
        }
        currentNode = currentNode.next;
        index++;
    }
    return null;
}

LinkedList.prototype.removeAt = function(position) {
    //console.log('length is: ' + this._length - 1);
    var length = this._length - 1,
        positionNode,
        withinBounds = this.withinBounds(position, length);
    
    
    if(withinBounds) {
        //if position is 0 then it means remove from Head. no need to reach loop
        if(position === 0) {
            //means remove the head and returns what was removed
            return this.removeHead();
        } else if(position === length) {
            //remove the tail
            return this.removeTail();
        }  else {
            //find the node you want to delete
            positionNode = this.findPositionNode(position);
            // if position node is found update the pointers
            if(positionNode !== null) {
                positionNode.previous.next = positionNode.next;
                positionNode.next.previous = positionNode.previous;
                //remove the pointers from the node marked for deletion
                var temp = positionNode;
                positionNode.next = null;
                positionNode.previous = null;
                //update length
                this._length--;

                //you dont have to do this. return node object to caller (just incase they want to do something else with it)
                //if not garbage collection will deal with this
                return temp;
            }
        }
    } else { //not within bounds
        throw new Error('Position Not Within Bounds');
    }    
}

LinkedList.prototype.remove = function(element) {
    //find element to remove index
    var elementIndex = this.indexOf(element);
    return this.removeAt(elementIndex)
};

LinkedList.prototype.indexOf = function(element) {
    var currentNode = this.head,
        index = 0;
    
    while(currentNode) {
        if(currentNode.element.key === element) {
            return index;
        }
        index++;
        currentNode = currentNode.next;
    }
    return -1;
};

LinkedList.prototype.display = function() {
    var currentNode = this.head;
    while(currentNode) {
        console.log(currentNode.element);
        currentNode = currentNode.next;
    }
};

LinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};

LinkedList.prototype.size = function() {
    return this._length;
};

//Testing insert
/*
var peopleList = new LinkedList();
peopleList.addToTail("Kofi");
peopleList.addToTail("Tani");
peopleList.addToTail("Julie");
peopleList.addToTail("Tani");
peopleList.addToTail("Ben");
peopleList.insertEnhanced(3, "Tarik");
peopleList.insert("Julie", "Charles");
peopleList.insert("Ben", "James");
console.log(peopleList);
*/ 
