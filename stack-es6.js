class Stack {
    constructor() {
        this.items = [];
    }

    //Stack Operations Go Here
    push(element) {
        //add item to the top of the stack
        this.items.push(element);
    }

    pop() {
        //remove item at the top of the stack
        return this.items.pop();
    }

    peek() {
        //return the item at top of the stack
        let lastItem = this.items.length-1;
        return this.items[lastItem];
    }

    isEmpty() {
        //return boolean whether stack is empty
        return this.items.length === 0;
    }

    size() {
        //return total number of items in stack
        return this.ltems.length;
    }

    clear() {
        //remove all items from the stack
        this.items = [];
    }

    toString () {
        //return an output of everything in the items array
        return this.items.toString();
    }
}

//Using the Stack
let stack = new Stack();
stack.push("Data 1");
stack.push("Data 2");
stack.push("Data 3");
console.log(stack);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack);
console.log(stack.size());