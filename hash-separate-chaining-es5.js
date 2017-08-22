function HashNode(key, value) {
    this.key = key;
    this.value = value;
    this.toString = function(){
        return this.key + ' -> ' + this.value;
    }
}

function HashTable(size) {
    //store hash data in an array called table
    //accessible to class instance
    this.table = new Array(size);

    //private function
    var hashFunction = function(key) {
        var hashTotal = 0,
        hashIndex,
        stringLength = key.length;

        if (stringLength === 0) return hashTotal;
    
        for(var i = 0; i < key.length; i++) {
            //hashTotal += key.charCodeAt(i);
            var char = key.charCodeAt(i);
            hashTotal = ( (hashTotal << 5) - hashTotal ) + char;
            hashTotal &= hashTotal;
        }
        //get hash index
        hashIndex = hashTotal % this.table.length;
        
        return hashIndex;
    };
    //access private function
    this.getHash = hashFunction;
}

HashTable.prototype = {
  put : function(key, value) {
      var indexForKey = this.getHash(key);

      if(this.table[indexForKey] === undefined) {
        this.table[indexForKey] = new LinkedList();
      }
      //create a new hash node for data we want to put
      var hashNode = new HashNode(key, value);
      //Using the addToTail method to append hashNode to back on linked list
      this.table[indexForKey].addToTail(hashNode);
  },
  get : function(key) {
      //first get the index of key
      var indexForKey = this.getHash(key);
      if(this.table[indexForKey] !== undefined) {
          //store a reference to the current index that is occupied (a linked list object)
          var linkedListObject = this.table[indexForKey];
          //since linked list, call the find method which returns an array of nodes matches in the linked list
          var linkedListNodes = linkedListObject.find(key);
          //display the contents of the nodes. this is not necessary now as whoever calls the get
          //method will get an array and they can do whatever they want with it. But i want to demonstrate this
          linkedListNodes.forEach(function(node){
            console.log('Returning: ' + node.element.value);
          });
          //return linkedListNodes to caller
          return linkedListNodes;
      }
      //return undefined if nothing was found.
      return undefined;
  },
  remove : function(key) {
      var indexForKey = this.getHash(key);
      if(this.table[indexForKey] !== undefined) {
        //store a reference to the current index that is occupied (a linked list object)
        var linkedListObject = this.table[indexForKey];
        //since linked list, call the find method which returns an array of nodes matches in the linked list
        var linkedListNodes = linkedListObject.find(key);
        //since we now have an array. loop through, and delete each node in the array from the linked list object
        linkedListNodes.forEach(function(node) {
            linkedListObject.remove(key);
        });
        //return true to call because something was deleted
        return true;
      }
      //return false to caller if there was nothing to delete
      return false;
  },
  displayTable : function(){
      this.table.forEach(function(currentValue, index){
         currentValue.display();
      });
  }
};

var hashTable = new HashTable(137);
hashTable.put('NY', 'New York');
hashTable.put('NY', 'New York Two');
hashTable.put('CT', 'Connecticut');
hashTable.put('NM', 'New Mexico');
hashTable.put('MN', 'Minnesota');
if (hashTable.get('cd') === undefined) {
    console.log('sorry... i didnt get anything');
}
//hashTable.remove('NY');
hashTable.displayTable();
console.log(hashTable.table);