function Set() {
  this.members = {};
}

Set.prototype = {
    //Adds a new member to our set
    add : function(member) {
        if(!this.has(member)){
            this.members[member] = member;
            return true;
        } else {
            return false;
        }
    },
    //Returns a boolean of whether a member exists
    has : function(member) {
        return this.members.hasOwnProperty(member);
    },
    //Removes a member from the set
    delete : function(member) {
        if(this.has(member)) {
            delete this.members[member];
            return true;
        } else {
            return false;
        }
    },
    //Removes all the members from the set.
    clear : function() {
        this.members = {};
    },
    //Returns the total number of member in the set.
    size : function() {
        return Object.keys(this.members).length;
    },
    //Returns an array of all the values that are found in the set. Values meaning keys (which are unique)
    values : function() {
        var results = [];

        for(var member in this.members) {
            results.push(member);
        }

        return results;
    },
    union : function(otherSet) {},
    subset : function(otherSet) {},
    intersection : function(otherSet) {},
    difference : function(otherSet) {}
};

//Testing
var numbers = new Set();
numbers.add(7);
numbers.add(8);
numbers.add(9);
numbers.add(10);
console.log(numbers.values()); // returns ["7", "8", "9", "10"]
numbers.delete(10);
console.log(numbers.values()); // returns ["7", "8", "9"]