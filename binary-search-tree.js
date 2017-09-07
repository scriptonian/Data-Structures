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
    find: function(key) {},
    remove: function(key) {},
    max: function(){},
    min: function() {},
    inOrder: function(node){},
    preOrder: function(node){},
    postOrder: function(node){},
    treeCount: function() {
        return this.count;
    }
}

var bst = new BinarySearchTree();
bst.insert(60);
bst.insert(30);
bst.insert(85);
bst.insert(95);
bst.insert(80);
bst.insert(35);
bst.insert(20);
console.log(bst);