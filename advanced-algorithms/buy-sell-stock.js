var sampleAPrices = [100, 10, 50, 40, 20],
    sampleADays = sampleAPrices.length,
    
    //always making a loss
    sampleBPrices = [30, 25, 12, 8, 1],
    sampleBDays = sampleBPrices.length,

    sampleCPrices = [7, 1, 5, 3, 6, 4],
    sampleCDays = sampleCPrices.length;


/**************************************************
 RECURSIVE APPROACH -- O(N^2) time complexity
 *************************************************/
function maxProfit(prices, days) {
    //set base case
    if(days === 0) return 0;
    //store initial max value
    var max_value = maxProfit(prices, days - 1);
    //console.log(max_value + ':' + days);
    for(var j = 1; j < days; ++j) {
        max_value = Math.max(max_value, prices[days - 1] - prices[j - 1]);
    }
    return max_value;
}

var maxprofit = maxProfit(sampleCPrices, sampleCDays);
console.log('Max Profit (Recursive Approach) : ', maxprofit);

/**************************************************
 DYNAMIC PROGRAMMING -- O(N^2) time complexity
 *************************************************/
function maxProfitDPInefficient(prices, days) {
    //set base case. Revenue at day 0
    var Rv = [];
    Rv[0] = 0;
    
    //for nested for loop to determine the next Rv
    for(var i = 1; i < days; i++) {
        Rv[i] = Rv[i - 1];
        for(var j = 0; j <= 1; j++) {
            Rv[i] = Math.max(Rv[i], prices[i] - prices[j]);
        }
        
    }
    //return revenue.
    return Rv[days - 1];
}

var ineffecient = maxProfitDPInefficient(sampleCPrices, sampleCDays);
console.log('Max Profit (Dynamic Programming - Ineffecient) : ', ineffecient);


/**************************************************
 DYNAMIC PROGRAMMING -- O(N) time complexity
 *************************************************/
function maxProfitOptimized(prices, days) {
    //set base case
    var Rv = [];
    Rv[0] = 0;
    
    //set a minimum value
    var min_value = prices[0];

    for(var i = 1; i < days; i++) {
        min_value = Math.min(min_value, prices[i - 1]);
        Rv[i] = Math.max(Rv[i - 1], prices[i] - min_value);
    }
    //return revenue.
    return Rv[days - 1];
}

var optimized = maxProfitOptimized(sampleCPrices, sampleCDays);
console.log('Max Profit (Dynamic Programming - Optimized) : ', optimized);