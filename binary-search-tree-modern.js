class TreeNode {
    constructor(keyValue) {
        this.keyValue = keyValue;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.count = 0;
    }

    insert(key) {
        //create a new tree
        let newNode = new TreeNode(key);
        //if root is empty set the new node to be the root, else add recursively
        this.root === null ? this.root = newNode : this.insertTo(this.root, newNode);
        //increment counter
        this.count++;
    }

    insertTo(positionNode, newNode){
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
    }
    
    find(key) {}
    remove(key) {}
    max(){}
    min() {}
    inOrder(node){}
    preOrder(node){}
    postOrder(node){}
    treeCount() {
        return counter;
    }
    toString() {
        return this.keyValue;
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