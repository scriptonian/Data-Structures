function TreeNode(keyValue) {
    this.keyValue = keyValue;
    this.left = null;
    this.right = null;
    this.toString = function(){
        return this.keyValue;
    }
}

function BinarySearchTree() {
    var root = null;
}

BinarySearchTree.prototype = {
    insert: function(key) {},
    find: function(key) {},
    remove: function(key) {},
    max: function(){},
    min: function() {},
    traverse: function(){}
}

