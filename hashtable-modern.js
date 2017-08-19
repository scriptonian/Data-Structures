const _hash = new WeakMap();

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
    //console.log("output private data: " + this.getHash(key));
    let indexForKey = this.getHash(key);
    this.table[indexForKey] = value;
  }
  get(key) {
    let indexForKey = this.getHash(key);
    return this.table[indexForKey];
  }
  remove(key) {
    let indexForKey = this.getHash(key);
    this.table[indexForKey] = undefined;
  }
  displayTable() {
    this.table.forEach(function(currentValue, index){
      console.log(index + " -> " + currentValue);
    });
  }
}

var hashTable = new HashTable(137);
hashTable.put('NY', 'New York');
hashTable.put('CT', 'Connecticut');
hashTable.put('NM', 'New Mexico');
hashTable.put('MN', 'Minnesota');
hashTable.get('CT');
hashTable.remove('CT');
hashTable.displayTable();