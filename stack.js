function Stack() {
    //store stack items in an array
    this.items = [];
}

Stack.prototype = {
    //Stack Operations Go Here

    //add item to the top of the stack
    push : function(element){
        this.items.push(element);
    },
    //remove item at the top of the stack
    pop : function() {
        return this.items.pop();
    },
    //return the item at top of the stack
    peek : function() {
        var lastItem = this.items.length-1;
        return this.items[lastItem];
    },
    //return boolean whether stack is empty
    isEmpty : function() {
        return this.items.length === 0;
    },
    //return total number of items in stack
    size : function() {
        return this.items.length;
    },
    //remove all items from the stack
    clear : function() {
        this.items = [];
    },

    //return an output of everything in the items array
    toString : function() {
        return this.items.toString();
    }
};

//Using the Stack
/*
var stack = new Stack();
stack.push("Data 1");
stack.push("Data 2");
stack.push("Data 3");
console.log(stack);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack);
console.log(stack.size());
*/