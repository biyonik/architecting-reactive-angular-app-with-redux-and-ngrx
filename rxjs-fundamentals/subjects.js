const { Subject, Observable, BehaviorSubject, ReplaySubject } = require('rxjs');

const streamObservable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
});

streamObservable$.subscribe(console.log)


// normal subject
// new up
// subscribe to it
// do next a few times

const stream$ = new Subject();
stream$.subscribe(data => console.log('from stream: ', data));
stream$.next(1);
stream$.next(2);
stream$.next(3);

// the case for a behaviour subject
const behaviourStream$ = new BehaviorSubject('initial value');
setTimeout(() => {
  behaviourStream$.next(11);
}, 3000)

behaviourStream$.subscribe(v => console.log('behaviourStream: ', v));
behaviourStream$.next(12);

// the case for a replay subject
const replayStream$ = new ReplaySubject();
replayStream$.next(1);
replayStream$.next(2);
replayStream$.next(3);
replayStream$.next(4);
replayStream$.next(5);

replayStream$.subscribe(v => console.log('replayStream: ', v));
replayStream$.next(6);
