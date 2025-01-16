// arrays (we can make every type of array)
const arr1 = [];

// push elements
arr1.push(1, 2, 3, 4)

// iterating elements
arr1.forEach(element => {
    console.log(element)
});

// length
let len = arr1.length
console.log("length is : ",len)

// keys
let keys = Object.keys(arr1)
console.log("indexes as array : ",keys)

// reverse
console.log("reversed array")
let reversedArr = arr1.reverse()
arr1.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});

// console.log("map the array")     
// arr1.map(()=>{

// })

// checking array
let isArray = Array.isArray(new Array([1,2,3,4,5]))
console.log("is written array is Array? : ", isArray)

// accessing with index
const arr2 = [1,2,3,4,5,6]
let index1 = 2
let index2 = -5
console.log(`element at index ${index1} is : `,arr2.at(index1))
console.log(`element at index ${index2} is : `,arr2.at(index2))

// entries() function/method
console.log("*****entries() function")
let arr3 = ['a','b','c'];
console.log("given array is:")
arr3.forEach((ele)=>{
    console.log(ele)
})
const iterator = arr3.entries()
console.log(iterator.next().value)
for(const[index,element] of arr3.entries())
{
    console.log(`index and element is: `,index,element)
}

// fill function => fill(fill with, from, to)
const arr4 = ["one","two","three","four","five"]
let newArr = arr4.fill("zero")
console.log("filled array is: ",newArr)

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
const arr5 = [1,2,5,8,6]
console.log(arr5.unshift(30,31));
console.log(arr5)

// flat
const arr6 = [0, 1, [2, [3, [4, 5]]]];
let newArr2 = arr6.flat();
console.log("flat array is : ",newArr2)

// join => to join elements with symbol/space
const elements = ["Ichi","Ni","San"];
console.log("Joined with ~ : ",elements.join('~'))

// toString => returns string containing src text which is used to define function. (converts whatever with string)
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let text = fruits.toString();
console.log("given array is converted to string: ",text)