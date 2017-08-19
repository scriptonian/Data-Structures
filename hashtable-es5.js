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
      //console.log("output private data: " + this.getHash(key));
      var indexForKey = this.getHash(key);
      this.table[indexForKey] = value;
  },
  get : function(key) {
      //first get the index of key
      var indexForKey = this.getHash(key);
      return this.table[indexForKey];
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
hashTable.get('CT');
hashTable.remove('CT');
hashTable.displayTable();
