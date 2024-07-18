
const {of, interval} = require('rxjs');

const stream$ = of(1, 2, 3);
stream$.subscribe(console.log)

// unsubscribe

const intervalStream$ = interval(1000);
const subscription = intervalStream$.subscribe(x => console.log('İnterval data: ', x));

setTimeout(() => {
    subscription.unsubscribe();
}, 5000)