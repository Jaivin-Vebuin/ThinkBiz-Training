// "use strict";

// Objects

// creating objects
const newObj = new Object();
newObj.comapany = "tbz";
console.log(newObj)

// assigning => new will add, older will replaced
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target);
console.log(returnedTarget === target);

// values => return object values as array
// keys => return keys as array
const o1 = {
    a: "one",
    b: "two",
    c: "three"
}
console.log(Object.values(o1))
console.log(Object.keys(o1))

// seal the properties => cannot be deleted
const object1 = {
    property1: 42,
};
Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// delete object1.property1; // Cannot delete when sealed
console.log(object1.property1);
console.log("check is it sealed ? : ", Object.isSealed(object1))
// checking length with same => can not determine length (do it by counting keys)
console.log(object1.length)

// freeze the properties => can no longer be changed
const newObj1 = {
    day: "friday"
}
Object.freeze(newObj1)
newObj1.day = "sunday"
// same for checking is it freeze ? => Object.isFrozen

// iterate in given object
const iterativeObj = {
    1: "one",
    2: "two",
    3: "three",
    4: "four"
}
for (let [k, v] of Object.entries(iterativeObj)) {
    console.log(k + " : " + v)
}

// groupBy in objects
const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
];
const result = Object.groupBy(inventory,({type})=>{return type});
console.log(result)
