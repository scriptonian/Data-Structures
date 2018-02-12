//var home_values = [10, 20, 30, 40, 50];
var home_values = [10,5,2,12];
var home_count = home_values.length;

function rob_recursive(count, nums) {
    //base case
    if(count === 0) return 0;
    if(count === 1) return nums[0];
    var maxValue = 0;
    /*
    case for when we dont steal house "i". by the end of this recursive call we know what  
    the max is for not stealing house "i". we need this for the second part of the formula
    where maxValue is the value we get from doing the first recursive call
    */
    maxValue = Math.max(maxValue, rob_recursive(count - 1, nums));
    //Next we run the second recursive call. case for when we do steal house "i"
    for(var i = count - 2; i >= 0; --i) {
        //note nums[count - 1] is the value of the last index or house "i"
        maxValue = Math.max(maxValue, rob_recursive(i, nums) + nums[count - 1] );
    }

    return maxValue;
}

var maxValueRec = rob_recursive(home_count, home_values);
console.log("Recursive Solution: " + maxValueRec);

function rob_dp(count, nums) {
    //base cases. So this to prevent loop from ever firing if count is <= 2
    if(count === 0) return 0;
    if(count === 1) return nums[0];
    if(count === 2) return Math.max(nums[0], nums[1]);
    
    //define an array F to hold max returns. this will be out table
    var F = [];
    F[0] = nums[0];
    F[1] = Math.max(nums[0], nums[1]);
    var length = nums.length;
    for(var i = 2; i < length; i++) {
        F[i] = Math.max(nums[i] + F[i - 2], F[i - 1]);
    }
    //return the last index
    return F[count - 1];
}

var maxValueDP = rob_dp(home_count, home_values);
console.log("Dynamic Programming Solution: " + maxValueDP);

/*
Bonus: this final method makes it easier to understand. Do take a look at it
This is neither recursive or DP.
*/
function rob(n, num) {
    var prevEvenMax = 0;
    var prevOddMax = 0;
    
    for (var i = 0; i < n; i++) {
        if (i % 2 === 0) {
            prevEvenMax = Math.max(prevEvenMax + num[i], prevOddMax);
        }
        else {
            prevOddMax = Math.max(prevEvenMax, prevOddMax + num[i]);
        }
    }
    
    return Math.max(prevEvenMax, prevOddMax);
}

var otherSolution = rob(home_count, home_values);
console.log("Other Solution: " + otherSolution);