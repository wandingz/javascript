// const { Observable, Subject, ReplaySubject, from, of, range, interval } = require('rxjs');
// const { map, filter, switchMap, share, publish, refCount } = require('rxjs/operators');

// let obs = interval(1000).pipe(
//     publish(),
//     refCount(),
// );

// setTimeout(() => {

//     obs.subscribe(v => console.log('#1:', v));

//     setTimeout(() => {
//         obs.subscribe(v => console.log("#2:", v));
//     }, 1400);

// }, 2100);

var arr = [1, 2, 3, 4, 5]

var res = arr.reduce((accumulator, currentValue) => {
    return [...accumulator, currentValue * 2];
}, []);

console.log(res);