console.log(1);

new Promise((resolve, reject) => {
    resolve(true);
})
    .then(d => {
        console.log(d);
    });

console.log(2);