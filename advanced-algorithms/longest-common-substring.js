/*
*   USING DYNAMIC PROGRAMMING:
*/

/*
    ARRAY HELPER FUNCTION
    
    Array extension by Douglas Crockford Javascript The Good Parts (O’Reilly, p. 64).
    This helps you create a multi dimensional array of size ROW & COLS and allows you
    to initialize the array with values
*/
Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; i++) {
        var columns = [];
        for (var j = 0; j < numcols; j++) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
}

function LCS(S1, len1, S2, len2) {
    var finalResult = -1;
    //define base case. if the length of either strings are zero, 
    //then no need to continue return 0
    for(var i = 0; i < len1; i++) {
        //console.log('S[' + i + "]" + ": " + S1[i]);
        for(var j = 0; j < len2; j++) {
            if(S1[i] === S2[j]) {
                //if there is a match and it happens in the first row or column then set it to 1
                if( i === 0 || j === 0) {
                    dpArr[i][j] = 1;
                } else { // update the diagonal slot
                    dpArr[i][j] = dpArr[i - 1][j - 1] + 1;
                }
            } else {
                dpArr[i][j] = 0;
            }
            finalResult = Math.max(finalResult, dpArr[i][j]);
        }
    }
    //return the final result
    return finalResult;
}

var string_one = "DEADBEEF", //DEADBEEF, abcdxyz, zxabcdezy
    string_one_length = string_one.length,
    string_two = "EATBEEF", //EATBEEF, xyzabcd, yzabcdezx
    string_two_length = string_two.length,
    //we increase the length by 1 so we can work with it in array terms
    dpArr = Array.matrix(string_one_length, string_two_length, 0),
    lcs = LCS(string_one, string_one_length, string_two, string_two_length);

console.log("Longest Comment Subsequence is: ", lcs);

