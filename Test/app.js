let list = [{
  name: 'John',
  age: 32 },
 {
  name: 'Sara',
  age: 40 },
 {
  name: 'Peter',
  age: 12
 }];

console.table(list.filter(p => p.age > 20));
console.table(list.map(p => ({name: p.name, birth: (new Date().getFullYear()) - p.age})));
console.log(list.reduce((accumulator, person) => accumulator + person.age, 0));
console.log(list.some(p => p.age > 39));