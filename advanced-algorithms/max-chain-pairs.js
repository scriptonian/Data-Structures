function Pair(a, b) {
    this.firstElement = a;
    this.secondElement = b;
}

function compareFirstElements(a, b) {
    if(a.firstElement < b.firstElement) {
        return -1;
    }
    if(a.firstElement > b.firstElement) {
        return 1;
    }
    return 0;
}

function maximumLength(collection) {
    //sort pairs
    var sorted = collection.sort(compareFirstElements);
    //console.log(sorted);

    var table = new Array(sorted.length);
    table[0] = 1;

    //time complexity here is O(N^2) which can be reduced to O(N logN)
    for(var i = 1; i < sorted.length; i++) {
        table[i] = table[i - 1];
        for(var j = i - 1; j >= 0; j--) {
            if(sorted[j].secondElement < sorted[i].firstElement) {                
                table[i] = Math.max(table[i], table[j] + 1);
            }
        }
    }
    //return last number in table which represents the max
    return table[sorted.length - 1];
}

//create an array of pairs
var pairA = new Pair(1, 2),
    pairB = new Pair(2, 3),
    pairC = new Pair(3, 4),

    pairD = new Pair(5, 24),
    pairE = new Pair(39, 60),
    pairF = new Pair(15, 28),
    pairG = new Pair(27, 40),
    pairH = new Pair(50, 90),

    pairCollection = [pairA, pairB, pairC ];
    //pairCollection = [pairD, pairE, pairF, pairG, pairH ];

var maxLength = maximumLength(pairCollection);
console.log("Max Length is: ", maxLength);
