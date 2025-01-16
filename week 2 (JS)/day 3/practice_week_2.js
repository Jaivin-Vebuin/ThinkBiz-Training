// This is JS practice of week 2 (day - tuesday)

// ******** Variables
// 3 ways - let, var, const

// var => for for both global and local, depend on context.
var b = "JS";
console.log(b);
b = "PY";
console.log(b)

// let and const => for block-scope variable
const varA = 10;
console.log(varA);
// varA = 15; // will throw the error
console.log(varA);

let x = 42;
let y;
console.log(x);
console.log(y); // undefined

if (10 > 5) {
    let var1 = "10 is bigger!";
    const var2 = "10 is bigger";
}
// console.log(var1, var2); // will throw the error of var1 and var2 are undefined.

// ************ data types
console.log("\nExploring different data types : \n");
let str = "Hello, World!";
let num = 42;
let isActive = true;
let notAssigned;
let nothing = null;
let uniqueId = Symbol('id');
let bigNumber = 1234567890123456789012345678901234567890n;

// *********Operators
console.log("\nExploring different operators : \n")
// Arithmetic
let a = 10;
b = 5;
let addition = a + b;
let subtraction = a - b;
let multiplication = a * b;
let division = a / b;
let modulus = a % b;
let exponentiation = a ** b;
// Comparision
a = 5, b = 10;
console.log(a == b);
console.log(a != b);
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);
// Logical operators
x = true, y = false;
console.log(x && y);
console.log(x || y);
console.log(!x);
// Ternary operator
let age = 18;
let canVote = (age >= 18) ? "Yes" : "No";
console.log(canVote);
// Bitwise operator
a = 5, b = 3;
console.log(a & b);
console.log(a | b);
console.log(a ^ b);
console.log(~a);
console.log(a << 1);
console.log(a >> 1);

// Basic I/O 
// alert("Hello, world!");
// let userName = prompt("What's your name?");
// console.log(`Hello, ${userName}`);

// age = prompt("Enter your age:");
// if (age >= 18) {
//     alert("You are an adult.");
// } else {
//     alert("You are a minor.");
// }

// Control flow => IF
console.log("\nExploring different Control statements : \n");
let score = 85;
if (score >= 90) {
    console.log("A");
} else if (score >= 70) {
    console.log("B");
} else {
    console.log("C");
}

// Control flow => Switch
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of the week");
        break;
    case "Friday":
        console.log("Weekend is near");
        break;
    default:
        console.log("Middle of the week");
}

// *********Loops
console.log("\nExploring different loops : \n")
let arr1 = [];
arr1.push(1, 2, 3, 4)

const obj = {};
obj.name = "Jaivin";
obj.company = "TBZ";
obj.age = 20;

// for loop
for (let index = 0; index < arr1.length; index++) {
    console.log(arr1[index])
}

// for...of
for (let num of arr1) {
    console.log(num);
}

// while loop
let len = arr1.length
let i = 0
while (len--) {
    console.log(arr1[i]);
    i++;
}

// for ... in
for (let [k, v] in Object.entries(obj)) {
    console.log(`elemets : ${k} , ${v}`);
}

// forEach
arr1.forEach(element => {
    console.log(element)
});

// break & continue
for (let i = 0; i < 5; i++) {
    if (i === 3) break;
    console.log(i);
}

for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);
}

// **********Functions
console.log("\nExploring User defined Functions : \n")
// Function Declaration
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet("Alice");

// Function Expression
const add = function (a, b) {
    return a + b;
};
console.log(add(5, 3));

// Arrow function
const multiply = (a, b) => { return a * b };
console.log(multiply(4, 6));

// Function parameters
function sayHello(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
sayHello(); // Default parameter
sayHello("Alice"); // Argument passed

// rest/spread operator => to wind up rest up elements
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4));

// IIFE (immidiately invoked function expression)
(() => {
    console.log("I am an IIFE!");
})();

let result = (function (a, b) {
    return a + b;
})(5, 3);
console.log(result);

// DOM manipulation
// Practiced in HTML file.

// ******* Objects (function, property etc.)
console.log("\nExploring Objects : \n")
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
const resultObject = Object.groupBy(inventory, ({ type }) => { return type });
console.log(resultObject)

// this keyword => point to current object (reference of the current object)
let person = {
    name: "Alice",
    greet: function () {
        console.log(`Hello, ${this.name}`);
    }
};
person.greet();


console.log("\nExploring Arrays : \n")
// ******* Arrays
arr1 = [];

// push elements
arr1.push(1, 2, 3, 4)

// iterating elements
arr1.forEach(element => {
    console.log(element)
});

// length
len = arr1.length
console.log("length is : ", len)

// keys
let keys = Object.keys(arr1)
console.log("indexes as array : ", keys)

// reverse
console.log("reversed array")
let reversedArr = arr1.reverse()
arr1.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});


// checking array
let isArray = Array.isArray(new Array([1, 2, 3, 4, 5]))
console.log("is written array is Array? : ", isArray)

// accessing with index
const arr2 = [1, 2, 3, 4, 5, 6]
let index1 = 2
let index2 = -5
console.log(`element at index ${index1} is : `, arr2.at(index1))
console.log(`element at index ${index2} is : `, arr2.at(index2))

// entries() function/method
console.log("*****entries() function")
let arr3 = ['a', 'b', 'c'];
console.log("given array is:")
arr3.forEach((ele) => {
    console.log(ele)
})
const iterator = arr3.entries()
console.log(iterator.next().value)
for (const [index, element] of arr3.entries()) {
    console.log(`index and element is: `, index, element)
}

// fill function => fill(fill with, from, to)
const arr4 = ["one", "two", "three", "four", "five"]
let newArr = arr4.fill("zero")
console.log("filled array is: ", newArr)

// slice function
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
console.log(animals.slice(2, 4));
console.log(animals.slice(1, 5));
console.log(animals.slice(-2));
console.log(animals.slice(2, -1));
console.log(animals.slice());

// sort function
const months1 = ['March', 'Jan', 'Feb', 'Dec'];
months1.sort();
console.log(months1);

// splice function
let months2 = ['Jan', 'March', 'April', 'June'];
months2.splice(1, 0, 'Feb');
console.log(months2);
months2 = ['Jan', 'March', 'April', 'June'];
months2.splice(1, 3, 'May');
console.log(months2);

// unshift / shift
const arr5 = [1, 2, 5, 8, 6]
console.log(arr5.unshift(30, 31));
console.log(arr5)

// flat
const arr6 = [0, 1, [2, [3, [4, 5]]]];
let newArr2 = arr6.flat();
console.log("flat array is : ", newArr2)

// join => to join elements with symbol/space
let elements = ["Ichi", "Ni", "San"];
console.log("Joined with ~ : ", elements.join('~'))

// toString => returns string containing src text which is used to define function. (converts whatever with string)
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let text = fruits.toString();
console.log("given array is converted to string: ", text)

// map
let arr = [1, 2, 3];
arr.map(x => x * 2);

// reduce function
sum = [1, 2, 3, 4].reduce((acc, current) => acc + current);
console.log(sum); // 10

// filter
elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
elements.filter((ele) => ele % 2 == 0)
console.log(elements);

// ********* Error Handeling
console.log("\nExploring error handeling : \n")
// try, catch and finally

try {
    let result = 10 / 0;
    console.log("Result:", result);
    if (result === Infinity)
        throw new Error("Something went wrong!");
    // for throwing the error
} catch (error) {
    console.error("Error caught:", error.message);
} finally {
    console.log("This is finally block, This block is always executed, whether there's an error or not.");
}

// custom error throwing

function checkAge(age) {
    if (age < 18) {
        throw new Error("Age must be 18 or older.");
    }
    return "Age is valid!";
}

try {
    console.log(checkAge(16));
} catch (error) {
    console.error("Error:", error.message);
}

try {
    console.log(checkAge(20));
} catch (error) {
    console.error("Error:", error.message);
}

// Working with Date and Time
console.log("\nExploring the Date function\n")
// Creating Date
let currentDate = new Date();
console.log(currentDate);
let specificDate = new Date("2025-01-01");
console.log(specificDate);
let specificDateTime = new Date("2025-01-01T12:00:00");
console.log(specificDateTime);
let customDate = new Date(2025, 0, 8, 10, 30, 0);
console.log(customDate);

// getting diff. components of date
let date = new Date("2025-01-08T10:30:00");
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDate());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());

// setting diff. components
console.log(date.setFullYear(2026));
console.log(date.setMonth(5));
console.log(date.setDate(15));
console.log(date.setHours(15));
console.log(date.setMinutes(45));

// Formatting dates
date = new Date("2025-10-18T10:30:00");

// Using toLocaleDateString() for local formatting
console.log(date.toLocaleDateString());

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(date.toLocaleDateString('en-US', options));

// Using toISOString() to get the date in ISO format
console.log(date.toISOString());

// Manually formatting the date DD/MM/YYYY
day = date.getDate().toString().padStart(2, "0");
let month = (date.getMonth() + 1).toString().padStart(2, "0");
let year = date.getFullYear();
console.log(`${day}/${month}/${year}`);

// current date
let currentTime = Date.now();
console.log(currentTime);

// ******** Async JS
console.log("Working with Async functions");

// callbacks
function fetchData(callback) { // function becomes call back
    setTimeout(() => { // first this set time out calls
        const data = "Data fetched!";
        callback(data); // callback handels the actual passed function
    }, 1000);
}

function processData(data) {
    console.log(data);
}

fetchData(processData); //the whole function passed

// error handeling with callbacks
function fetchData(callback) {
    setTimeout(() => {
        const error = true;
        if (error) {
            callback("An error occurred", null);
        } else {
            const data = "Data fetched!";
            callback(null, data);
        }
    }, 1000);
}

function processData(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
}
fetchData(processData);

// Promises and chaining it
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Failed to fetch data");
            }
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log(data);
    })
    .then(message => {
        console.log(message)
    })
    // ... can add more .then to chain more successfull promise resolution tasks
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log("resolve or not, this will be performed.")
    })


// Async - Await with chaining
async function fetchData2() {
    return "Data fetched successfully!";
}

async function processData2() {
    const data = await fetchData2(); // 
    console.log(data);
    return "Data processed!";
}

async function main2() {
    const result = await processData2();
    console.log(result);
}

main2();

// Closures
console.log("\nworking with closures : \n");
function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); 
console.log(add10(2)); 

// Higher Order functions
console.log("\nExploring Higher Order functions : \n")

















