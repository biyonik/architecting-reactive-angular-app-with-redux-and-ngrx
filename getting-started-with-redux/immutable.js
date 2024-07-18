function double(a) {
    return a * 2;
}

function add(prev, a) {
    return prev + a;
}

let res = add(double(2), 5);

console.log('res: ', res);

res = add(double(2), 5);

console.log('res: ', res);