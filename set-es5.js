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
    union : function(otherSet) {
        var unionSet = new Set(),
            firstSetKeys,
            secondSetKeys;
        //iterate first set and add it to union
        firstSetKeys = this.values();
        firstSetKeys.forEach(function(key){
            unionSet.add(key);
        });
        //iteration other set and it key/value to union set if only unique
        secondSetKeys = otherSet.values();
        secondSetKeys.forEach(function(key){
            if(unionSet.has(key)) {
                // do nothing
            } else {
                unionSet.add(key);
            }
        });
        return unionSet;
    },
    subset : function(otherSet) {
        var currentKeys = this.values(),
            otherSetKeys = otherSet.values(),
            isSubset;

        isSubset = currentKeys.every(function(key){
            return otherSetKeys.indexOf(key) != -1;
        });
        
        return isSubset;
    },
    intersection : function(otherSet) {
        var interSet = new Set(),
            firstSetKeys,
            otherSetKeys;

        firstSetKeys = this.values();
        otherSetKeys = otherSet.values();
        firstSetKeys.forEach(function(key){
            if(otherSetKeys.indexOf(key) != -1) {
                interSet.add(key);
            }
        });
        
        return interSet;
    },
    difference : function(otherSet) {
        var diff = new Set(),
            firstSetKeys,
            otherSetKeys;

        firstSetKeys = this.values();
        otherSetKeys = otherSet.values();
        firstSetKeys.forEach(function(key){
            if(otherSetKeys.indexOf(key) == -1) {
                diff.add(key);
            }
        });

        return diff;
    }
};