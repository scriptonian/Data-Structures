console.log('ES2015 and Beyond: Sets');

let ruskiSet = new Set();
ruskiSet.add('privyet');
ruskiSet.add('poka');
ruskiSet.add('pochimu');
console.log(ruskiSet.values()); // returns SetIterator {"hi", "bye", "why"}

console.log('------- for..of -----------');
for(let phrase of ruskiSet) {
    console.log(`${phrase}`);
}

console.log('-------Using Object Destructing-----------');
//Object destruction
let [hello, bye, why] = ruskiSet;
console.log(hello);
console.log(bye);
console.log(why);