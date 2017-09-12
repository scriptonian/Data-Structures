function TreeNode(keyValue) {
    this.keyValue = keyValue;
    this.left = null;
    this.right = null;
    this.toString = function(){
        return this.keyValue;
    }
}

function BinarySearchTree() {
    this.root = null;
    //not private but you can refactor if you want
    this.count = 0;
}

BinarySearchTree.prototype = {
    insert: function(key) {
        //create a new tree
        var newNode = new TreeNode(key);
        //if root is empty set the new node to be the root, else add recursively
        this.root === null ? this.root = newNode : this.insertTo(this.root, newNode);
        //increment counter
        this.count++;
    },

    insertTo: function(positionNode, newNode){
        // First Scenario: if the new nodes value is less than the current node. Move in the left direction of positionNode
        if(newNode.keyValue < positionNode.keyValue) {
            //if the left node is empty, then make this the new left node
            if(positionNode.left === null) {
                positionNode.left = newNode;
            } else {
                //add it to the left node
                this.insertTo(positionNode.left, newNode);
            }
        } else { // Second Scenario: if the new nodes value is greater than the current node. Move in the right direction of positionNode
            if(positionNode.right === null) {
                positionNode.right = newNode;
            } else {
                //add it to the right node
                this.insertTo(positionNode.right, newNode);
            }
        }
    },
    //finds a node and returns it.
    find: function(node, key) {
        var currentNode = node;
        
        if (currentNode === null){
            return false;
        }
        if(currentNode.keyValue === key){
            console.log('value found');
            return currentNode;
        }
        if(key < currentNode.keyValue) {
            return this.find(currentNode.left, key);
        }
        return this.find(currentNode.right, key);
    },

    //Works like find. but in addition returns the parent of the node
    findNodeParent: function(key) {
        var parent = null,
            currentNode = this.root;
        
        while(currentNode !== null){
            if( key < currentNode.keyValue){
                parent = currentNode;
                currentNode = currentNode.left;
            } else if(key > currentNode.keyValue) {
                parent = currentNode;
                currentNode = currentNode.right;
            } else {
                break;
            }
        }
        return parent;
    },

    max: function(){
        var currentNode = this.root;
        if(currentNode !== null) {
            while(currentNode.right !== null) {
                currentNode = currentNode.right;
            }
            return currentNode.keyValue;
        }
        return null;
    },

    min: function() {
        var currentNode = this.root;
        if(currentNode !== null) {
            while(currentNode.left !== null) {
                currentNode = currentNode.left;
            }
            return currentNode.keyValue;
        }
        return null;
    },

    inOrder: function(node){
        if (node !== null) {
            //print the left subtree recursively
            this.inOrder(node.left);
            //print the root node
            console.log(node.toString()); 
            //print the right subtree recursively
            this.inOrder(node.right);
        }
    },

    preOrder: function(node){
        if (node !== null) {
            //print the root node
            console.log(node.toString());             
            //print the left subtree recursively
            this.preOrder(node.left);
            //print the right subtree recursively
            this.preOrder(node.right);
        }
    },

    postOrder: function(node){
        if (node !== null) {           
            //print the left subtree recursively
            this.postOrder(node.left);
            //print the right subtree recursively
            this.postOrder(node.right);
            //print the root node
            console.log(node.toString());              
        }
    },

    treeCount: function() {
        return this.count;
    },

    remove: function(key) {
        /*
        First we find out if the node exists. If it doesn't exist, we return null and exit the function
        */
        if(this.root === null) {
            return false;
        }

        //find the node in question
        var currentNode = this.find(this.root, key);
        //find nodes parent. 
        var nodeParent = this.findNodeParent(key);

        //case 1: remove a node that does not have a right child.
        if(currentNode.right === null) {
            if(nodeParent === null) {
                this.root = currentNode.left;
            } else {
                //if parent is greater than current value, make teh current left child a child of parent
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = currentNode.left;
                //if parent is less than current value, make the left child a right child of parent.
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = currentNode.left;
                }
            }
        //case 2. if the node we are removing has a right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
            currentNode.right.left = currentNode.left;
            if(nodeParent === null) {
                this.root = currentNode.right;
            } else {
                //if current value is less than parent, make right child of the left the parent
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = currentNode.right;
                //if current value is greater than parent, make current right child a right child of the parent
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = currentNode.right;
                }
            }
        //case 3 if the node we are removing has a right child that has a left child.
        //promote the left child to deleted spot
        } else {
            //find the rights left most child
            var leftmost = currentNode.right.left;
            var leftmostParent = currentNode.right;

            while(leftmost.left !== null) {
                leftmostParent = leftmost;
                leftmost = leftmost.left;
            }
            //parents left subtree becomes the leftmost's right subtree
            leftmostParent.left = leftmost.right;
            //assign leftmost's left and right to the current left and right children
            leftmost.left = currentNode.left;
            leftmost.right = currentNode.right;

            if(nodeParent === null) {
                this.root = leftmost;
            } else {
                if(currentNode.keyValue < nodeParent.keyValue) {
                    nodeParent.left = leftmost;
                } else if(currentNode.keyValue > nodeParent.keyValue) {
                    nodeParent.right = leftmost;
                }
            }
        }
        //decrease the count
        this.count--;

        return true;
    }
}

var bst = new BinarySearchTree();
/*bst.insert(60);
bst.insert(30);
bst.insert(85);
bst.insert(95);
bst.insert(80);
bst.insert(35);
bst.insert(20);*/

//case 1
/*
bst.insert(4);
bst.insert(2);
bst.insert(8);
bst.insert(1);
bst.insert(3);
bst.insert(6);
bst.insert(7);
bst.insert(5);
*/

//case 2
/*
bst.insert(4);
bst.insert(2);
bst.insert(6);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(7);
bst.insert(8);
*/

//case 3

bst.insert(4);
bst.insert(2);
bst.insert(6);
bst.insert(1);
bst.insert(3);
bst.insert(5);
bst.insert(8);
bst.insert(7);


/*
bst.inOrder(bst.root);
console.log("-----");
bst.preOrder(bst.root);
console.log("-----");
bst.postOrder(bst.root);

console.log("Min is: " + bst.min());
console.log("Max is: " + bst.max());
console.log(bst.find(bst.root, 30));
*/

