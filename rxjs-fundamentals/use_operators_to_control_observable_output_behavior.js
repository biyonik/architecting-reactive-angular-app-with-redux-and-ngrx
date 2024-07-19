const {of, map, filter, tap} = require('rxjs');

// projection

const streamProjection$ = of(1, 2, 3, 4)
    .pipe(
        map(value => value + 1)
    )

streamProjection$.subscribe(val => console.log(`streamProjection: ${val}`))

// filtering

const streamFiltered$ = of(1, 2, 3, 4).
    pipe(
        filter(value => value % 2 === 0)
    )

streamFiltered$.subscribe(val => console.log(`streamFiltered: ${val}`))

// combining operators

const projectionAndFiltering$ = of(1, 2, 3, 4)
    .pipe(
        map(value => value + 1),
        filter(value => value % 2 === 0)
    );

projectionAndFiltering$.subscribe(val => console.log(`projectionAndFiltering: ${val}`))

const debuggingStream$ = of(1, 2, 3, 4)
    .pipe(
        tap(value => console.log(`before map: ${value}`)),
        map(value => value + 1),
        tap(value => console.log(`after map: ${value}`)),
        filter(value => value % 2 === 0)
    )

debuggingStream$.subscribe(val => console.log(`debuggingStream: ${val}`))