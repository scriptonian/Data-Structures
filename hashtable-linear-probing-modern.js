const _hash = new WeakMap();

class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return this.key + ' -> ' + this.value;
  }
}

class HashTable {
  constructor(size) {
    //instance variable  
    this.table = new Array(size);

    _hash.set(this, (key) => {
      let hashTotal = 0,
      hashIndex,
      stringLength = key.length;

      if (stringLength === 0) return hashTotal;
  
      for(let i = 0; i < key.length; i++) {
          let char = key.charCodeAt(i);
          hashTotal = ( (hashTotal << 5) - hashTotal ) + char;
          hashTotal &= hashTotal;
      }
      //get hash index
      hashIndex = hashTotal % this.table.length;
      
      return hashIndex;
     });
  }

  getHash(key) {
    return _hash.get(this)(key);
  }

  put(key, value) {
    let indexForKey = this.getHash(key);
    
    if(this.table[indexForKey] === undefined) {
        //create a new HashNode object in that location  
        this.table[indexForKey] = new HashNode(key,value);
    } else {
        //something already exists here, so create a spot in the next available array slot
        while(this.table[indexForKey] !== undefined) {
            indexForKey++;
        }
        this.table[indexForKey] = new HashNode(key, value);
    }
  }

  get(key) {
    console.log('inside get...');
    //first get the index of key
    let indexForKey = this.getHash(key);
    //as long as there is an index not undefined then there is a chance there is one or more items
    //in that location. If there is only one, return from loop. otherwise 
    for(let i = indexForKey; this.table[indexForKey] !== undefined; i++) {
        if(this.table[indexForKey].key === key) {
            console.log(this.table[indexForKey].value);
            return this.table[indexForKey].value;
        }
    }
    return undefined;
  }

  remove(key) {
    let indexForKey = this.getHash(key);
    if(this.table[indexForKey] !== undefined) {
      //store a reference to the current index that is occupied (a linked list object)
      let linkedListObject = this.table[indexForKey];
      //since linked list, call the find method which returns an array of nodes matches in the linked list
      let linkedListNodes = linkedListObject.find(key);
      //since we now have an array. loop through, and delete each node in the array from the linked list object
      linkedListNodes.forEach(function(node) {
          linkedListObject.remove(key);
      });
      //return true to call because something was deleted
      return true;
    }
    //return false to caller if there was nothing to delete
    return false;
  }
  displayTable() {
    this.table.forEach(function(currentValue, index){
      currentValue.display();
   });
  }
}

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