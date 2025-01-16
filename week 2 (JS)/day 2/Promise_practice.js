// Promises

// all()
const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p1 data fetched");
    }, 200)
})

const p2 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p2 data fetched");
    }, 100)
})

const p3 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p3 data fetched");
    }, 500)
})

let Promises = [p1, p2, p3];

Promise.all(Promises)
    .then((data) => {
        console.log("Resolved", data);
    })
    .catch((error) => {
        console.log("Rejected", error);
    })
    .finally(() => {
        console.log("This will happen always !!");
    })

// allSetteled()
const p4 = new Promise((res, rej) => {
    setTimeout(() => {
        rej("p4 data not fetched");
    }, 200)
})

const p5 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p5 data fetched");
    }, 100)
})

const p6 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p6 data fetched");
    }, 500)
})

Promises = [p4, p5, p6];

Promise.allSettled(Promises)
    .then((data) => {
        console.log("Resolved", data);
    })
    .catch((error) => {
        console.log("Rejected", error);
    })
    .finally(() => {
        console.log("This will happen always !!");
    })

// any()
const p7 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p7 data not fetched");
    }, 200)
})

const p8 = new Promise((res, rej) => {
    setTimeout(() => {
        rej("p8 data fetched");
    }, 100)
})

const p9 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p9 data fetched");
    }, 500)
})

Promises = [p7, p8, p9];

Promise.any(Promises)
    .then((data) => {
        console.log("Resolved", data);
    })
    .catch((error) => {
        console.log("Rejected", error);
    })
    .finally(() => {
        console.log("This will happen always !!");
    })

// promise.race()
const p10 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p10 data not fetched");
    }, 100)
})

const p11 = new Promise((res, rej) => {
    setTimeout(() => {
        rej("p11 data fetched");
    }, 500)
})

const p12 = new Promise((res, rej) => {
    setTimeout(() => {
        res("p12 data fetched");
    }, 100)
})

Promises = [p10, p11, p12];

Promise.race(Promises)
    .then((data) => {
        console.log("Resolved", data);
    })
    .catch((error) => {
        console.log("Rejected", error);
    })
    .finally(() => {
        console.log("This will happen always !!");
    })
