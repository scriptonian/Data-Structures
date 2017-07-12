function Map() {
  //store map items in an object
  this.items = {};
}

Map.prototype = {
  //Map Operations Go Here
  
  set : function(key, value) {
    this.items[key] = value;
  },
  
  get : function(key) {
    return this.items[key];
  },

  has : function(key) {
    return this.items.hasOwnProperty(key);
  },

  delete : function(key) {
      var keyExists = this.has(key);
      if(keyExists) {
        delete this.items[key];
        return true;
      } else {
          return false;
      }
  },

  //Removes all the items from the map/dictionary.
  clear : function() {
    this.items = {};
  },

  //Returns the total number of items in the map/dictionary.
  size : function() {
    return Object.keys(this.items).length;
  },

  //Returns an array of all the keys that are found in the map/dictionary
  keys : function() {
    var keys = [];

    for(key in this.items) {
      if(this.items.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    return keys;
  },

  values : function() {
    var values = [],
        value;

    for(key in this.items) {
      if(this.items.hasOwnProperty(key)) {
        value = this.items[key];
        values.push(value);
      }
    }

    return values;    
  },

  sort : function() {
    var keys = Object.keys(this.items),
        finalSort = [],
        that = this;
        sortedKeys = keys.sort();
    sortedKeys.forEach(function(key) {
      console.log(key + ' => ' + that.items[key]);
    });
  }
  
};

/*
var russianwords = new Map();
//set values
russianwords.set("hi", "privyet");
russianwords.set("yes", "da");
russianwords.set("no", "nyet");
russianwords.set("fool", "durak");

//get values
russianwords.get("hi"); // privyet
*/