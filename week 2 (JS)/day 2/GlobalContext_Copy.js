console.log('1')

setTimeout(()=>{
    console.log('2');
},1000)

const p1 = new Promise((res,rej)=>{
 res('3')
})

p1.then((msg)=>{
    console.log(msg);
})

console.log('4')

// call stack => GE
// clg(1)
// task Q => setTimeOut
// micro task Q => Promise andmutation observer
// clg(4)
// promise = clg(3)
// setTimeout = clg(2)
// 1,4,3,2



// Shallow copy 
const q1 = {
    id : '1',
    ob2 : {
        id : '2'
    }
}

const q2 = Object.assign({},q1)
const q3 = {...q1}
console.log(q2);
q2.id = '3';
q2.ob2.id = '10';
console.log(q1);
console.log(q2);

// makes deep copy, but not of any function
const q4 = JSON.parse(JSON.stringify(q1));
q4.id = '100';
console.log(q1);

// full deep copy
const q5 = structuredClone(q1);
q5.id = 'q5';
console.log(q1)

// async/await
async function fetchData2() {
    return "Data fetched successfully!";
}

async function processData2() {
    const data = await fetchData2(); // 
    console.log(data);
    return "Data processed!";
}

async function main() {
    const result = await processData2();
    console.log(result);
}

main();