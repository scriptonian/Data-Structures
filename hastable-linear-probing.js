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
        //create a new HashNode object in that location  
        this.table[indexForKey] = new HashNode(key,value);
      } else {
          //something already exists here, so create a spot in the next available array slot
          while(this.table[indexForKey] !== undefined) {
            indexForKey++;
          }
          this.table[indexForKey] = new HashNode(key, value);
      }
  },
  get : function(key) {
      console.log('inside get...');
      //first get the index of key
      var indexForKey = this.getHash(key);
      //as long as there is an index not undefined then there is a chance there is one or more items
      //in that location. If there is only one, return from loop. otherwise 
      for(var i = indexForKey; this.table[indexForKey] !== undefined; i++) {
          if(this.table[indexForKey].key === key) {
              console.log(this.table[indexForKey].value);
              return this.table[indexForKey].value;
          }
      }
      return undefined;
  },
  remove : function(key) {
      var indexForKey = this.getHash(key);
      this.table[indexForKey] = undefined;
  },
  displayTable : function(){
      this.table.forEach(function(currentValue, index){
          console.log(index + " -> " + currentValue);
      });
  }
};

var hashTable = new HashTable(137);
hashTable.put('NY', 'New York');
hashTable.put('CT', 'Connecticut');
hashTable.put('NM', 'New Mexico');
hashTable.put('MN', 'Minnesota');
hashTable.displayTable();
hashTable.get('CT');