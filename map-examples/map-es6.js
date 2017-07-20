console.log('ES2015 and Beyond: Maps');

let map = new Map();
map.set('hi', 'privyet');
map.set('bye', 'poka');
map.set('why', 'pochimu');
console.log(map.values());

for(let [key, value] of map) {
    console.log(`${key} => ${value}`);
}
