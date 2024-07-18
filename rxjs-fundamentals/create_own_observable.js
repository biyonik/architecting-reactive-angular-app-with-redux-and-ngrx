
const { Observable } = require('rxjs');

// const stream$ = new Observable(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
// });

// stream$.subscribe(console.log)

const streamPromise$ = new Observable(observer => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('data')
        }, 3000)
    })

    promise.then(data => {
        observer.next(data)
    }, err => {
        observer.error(err)
    })
});

streamPromise$.subscribe({
    next: data => console.log('from promise data: ', data),
    error: err => console.log('from promise error: ', err),
})


// cleanup

const intervalStream$ = new Observable(observer => {
    let i = 0;
    const id = setInterval(() => {
        ++i;
        console.log('i: ', i);
        observer.next(i)
    }, 1000)

    return () => {
        console.log('cleanup');
        clearInterval(id);
    }
});

const subscription = intervalStream$.subscribe(data => console.log('from interval: ', data));
setTimeout(() => {
    subscription.unsubscribe();
}, 4000)